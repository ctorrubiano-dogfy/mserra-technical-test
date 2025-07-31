import {  DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

import NotFoundError from '../../shared/errors/NotFoundError';

class InMemoryDeliveryRepository implements DeliveryRepositoryInterface {
  private deliveries: DeliveryEntity[] = [];

  async create(delivery: DeliveryEntity): Promise<void> {
    this.deliveries.push(delivery);
  }

  async find(reference: string): Promise<DeliveryEntity> {
    const delivery = this.deliveries.find(delivery => delivery.id === reference || delivery.trackingNumber === reference);
    if (!delivery) throw new NotFoundError(`Delivery with reference ${reference} not found.`);

    return delivery;
  }

  async findAllActive(): Promise<DeliveryEntity[]> {
    return this.deliveries.filter(delivery => !FINAL_DELIVERY_STATUSES.includes(delivery.status));
  }

  async updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void> {
    const index: number = this.deliveries.findIndex(d => d.id === deliveryId);
    if (index === -1) throw new NotFoundError(`Delivery with id ${deliveryId} not found.`);
    this.deliveries[index] = delivery;
  }
  
  async deleteById(deliveryId: string): Promise<void> {
    const index: number = this.deliveries.findIndex(d => d.id === deliveryId);
    if (index === -1) throw new NotFoundError(`Delivery with id ${deliveryId} not found.`);
    this.deliveries.splice(index, 1);
  }
}

export default InMemoryDeliveryRepository;