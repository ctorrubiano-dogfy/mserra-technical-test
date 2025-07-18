import {  DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';
class InMemoryDeliveryRepository implements DeliveryRepositoryInterface {
  private deliveries: DeliveryEntity[] = [];

  async create(delivery: DeliveryEntity): Promise<void> {
    this.deliveries.push(delivery);
  }

  async findById(id: string): Promise<DeliveryEntity | undefined> {
    return this.deliveries.find(delivery => delivery.id === id);
  }

  async findAllActive(): Promise<DeliveryEntity[]> {
    return this.deliveries.filter(delivery => !FINAL_DELIVERY_STATUSES.includes(delivery.status));
  }

  async findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | undefined> {
    return this.deliveries.find(delivery => delivery.trackingNumber === trackingNumber);
  }

  async updateById(deliveryId: string, delivery: DeliveryEntity): Promise<void> {
    const index: number = this.deliveries.findIndex(d => d.id === deliveryId);
    if (index === -1) throw new Error(`Delivery with id ${deliveryId} not found`);
    this.deliveries[index] = delivery;
  }
}

export default InMemoryDeliveryRepository;