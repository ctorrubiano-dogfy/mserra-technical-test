import {  DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';
import NotFoundError from '../../shared/errors/NotFoundError';
class InMemoryDeliveryRepository implements DeliveryRepositoryInterface {
  private deliveries: DeliveryEntity[] = [];

  async create(delivery: DeliveryEntity): Promise<void> {
    this.deliveries.push(delivery);
  }

  async find(id: string): Promise<DeliveryEntity> {
    const delivery = this.deliveries.find(delivery => delivery.id === id || delivery.trackingNumber === id);
    if (!delivery) throw new NotFoundError(`Delivery with id ${id} not found`);

    return delivery;
  }

  async findAllActive(): Promise<DeliveryEntity[]> {
    return this.deliveries.filter(delivery => !FINAL_DELIVERY_STATUSES.includes(delivery.status));
  }

  async updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void> {
    const index: number = this.deliveries.findIndex(d => d.id === deliveryId);
    if (index === -1) throw new Error(`Delivery with id ${deliveryId} not found`);
    this.deliveries[index] = delivery;
  }
}

export default InMemoryDeliveryRepository;