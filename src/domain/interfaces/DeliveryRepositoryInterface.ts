import DeliveryEntity from '../entities/DeliveryEntity';

export interface DeliveryRepositoryInterface {
  create(delivery: DeliveryEntity): Promise<void>
  findById(id: string): Promise<DeliveryEntity | undefined>
  findByTrackingNumber(id: string): Promise<DeliveryEntity | undefined>
  findAllActive(): Promise<DeliveryEntity[]>
  updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void>
}