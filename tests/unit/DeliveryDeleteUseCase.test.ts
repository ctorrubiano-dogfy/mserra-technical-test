import { test, expect, beforeEach, describe } from 'vitest';
import DeliveryEntity from '../../src/domain/entities/DeliveryEntity';
import { DeliveryStatusValueObject } from '../../src/domain/value-objects/DeliveryStatusValueObject';
import InMemoryDeliveryRepository from '../../src/infrastructure/persistence/InMemoryDeliveryRepository';
import DeliveryDeleteUseCase from '../../src/application/useCases/DeliveryDeleteUseCase';
import BadRequestError from '../../src/shared/errors/BadRequestError';
import NotFoundError from '../../src/shared/errors/NotFoundError';

describe('DeliveryDeleteUseCase', () => {
  let deliveryRepository: InMemoryDeliveryRepository;
  let deliveryDeleteUseCase: DeliveryDeleteUseCase;

  const sampleDelivery = new DeliveryEntity(
    'test-id-123',
    DeliveryStatusValueObject.LABEL_GENERATED,
    new Date(),
    'Test Address',
    'John Doe',
    'Spain',
    '08001'
  );

  beforeEach(() => {
    deliveryRepository = new InMemoryDeliveryRepository();
    deliveryDeleteUseCase = new DeliveryDeleteUseCase(deliveryRepository);
  });

  test('should successfully delete an existing delivery', async () => {
    // Arrange
    await deliveryRepository.create(sampleDelivery);
    
    // Act
    const result = await deliveryDeleteUseCase.execute({ id: 'test-id-123' });
    
    // Assert
    expect(result).toEqual({
      success: true,
      message: 'Delivery with ID test-id-123 was successfully deleted.'
    });
    
    // Verify the delivery no longer exists
    await expect(deliveryRepository.find('test-id-123')).rejects.toThrow(NotFoundError);
  });

  test('should throw BadRequestError when ID is not provided', async () => {
    await expect(deliveryDeleteUseCase.execute({ id: '' })).rejects.toThrow(BadRequestError);
  });

  test('should throw NotFoundError when trying to delete non-existent delivery', async () => {
    await expect(deliveryDeleteUseCase.execute({ id: 'non-existent-id' })).rejects.toThrow(NotFoundError);
  });
});
