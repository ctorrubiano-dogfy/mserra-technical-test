import { test, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { deliveryRoutes } from '../../src/infrastructure/http/FastifyServer';
import Fastify from 'fastify';
import { MongoDeliveryRepository, connectToMongo } from '../../src/infrastructure/persistence/MongoDeliveryRepository';
import DeliveryEntity from '../../src/domain/entities/DeliveryEntity';
import { DeliveryStatusValueObject } from '../../src/domain/value-objects/DeliveryStatusValueObject';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

describe('Delete Delivery Endpoint', () => {
  let app: FastifyInstance;
  let deliveryRepository: MongoDeliveryRepository;
  let testDeliveryId: string;

  beforeAll(async () => {
    await connectToMongo();
    
    app = Fastify({ logger: false });
    await app.register(deliveryRoutes);
    await app.ready();
    
    deliveryRepository = new MongoDeliveryRepository();
    
    // Create a test delivery to delete
    testDeliveryId = uuidv4();
    const testDelivery = new DeliveryEntity(
      testDeliveryId,
      DeliveryStatusValueObject.LABEL_GENERATED,
      new Date(),
      'Test Address',
      'John Doe',
      'Spain',
      '08001'
    );
    
    await deliveryRepository.create(testDelivery);
  });

  afterAll(async () => {
    await app.close();
    await mongoose.connection.close();
  });

  test('DELETE /deliveries/:id - successful deletion', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/deliveries/${testDeliveryId}`,
    });
    
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.message).toContain(testDeliveryId);
    
    // Verify deletion
    try {
      await deliveryRepository.find(testDeliveryId);
      throw new Error('Delivery should not exist');
    } catch (error) {
      expect(error.message).toContain('not found');
    }
  });

  test('DELETE /deliveries/:id - non-existent delivery', async () => {
    const nonExistentId = uuidv4();
    const response = await app.inject({
      method: 'DELETE',
      url: `/deliveries/${nonExistentId}`,
    });
    
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toBe('NotFoundError');
  });
});
