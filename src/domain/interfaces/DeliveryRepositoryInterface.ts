import DeliveryEntity from '../entities/DeliveryEntity';

export interface DeliveryRepositoryInterface {
  create(delivery: DeliveryEntity): Promise<void>
  find(reference: string): Promise<DeliveryEntity>
  findAllActive(): Promise<DeliveryEntity[]>
  updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void>
  deleteById(deliveryId: string): Promise<void>
}