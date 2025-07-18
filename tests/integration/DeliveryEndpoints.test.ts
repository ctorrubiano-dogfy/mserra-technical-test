import Fastify from 'fastify';
import { afterEach, beforeEach, describe, expect, it, beforeAll } from 'vitest';
import { connectToMongo } from '../../src/infrastructure/persistence/MongoDeliveryRepository';
import { deliveryRoutes } from '../../src/infrastructure/http/FastifyServer';
import { DeliveryCreateDTO } from '../../src/application/dtos/DeliveryCreateDTO';

function buildFastify() {
  const fastify = Fastify();
  fastify.register(deliveryRoutes);
  return fastify;
}

describe('Delivery Endpoints', () => {
  let fastify: ReturnType<typeof buildFastify>;

  beforeAll(async () => {
    await connectToMongo();
  });

  beforeEach(async () => {
    fastify = buildFastify();
    await fastify.ready();
  });

  afterEach(async () => {
    await fastify.close();
  });

  it('POST /deliveries should create a delivery and return 201', async () => {
    const payload: DeliveryCreateDTO = {
      id: `test-order-${Date.now()}`,
      recipientName: 'John Doe',
      address: 'Calle Falsa 123',
      postalCode: '08001',
      country: 'ES',
      weight: 2.5,
    };

    const response = await fastify.inject({
      method: 'POST',
      url: '/deliveries',
      payload,
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('label');
    expect(body).toHaveProperty('trackingNumber');
  });
});
