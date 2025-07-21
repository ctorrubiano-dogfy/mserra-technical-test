import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

import { UseCase } from '../interfaces/UseCaseInterface';

class DeliveryStatusUpdateFromWebhookUseCase implements UseCase<{ trackingNumber: string, status: string }, void> {
  constructor(private deliveryRepository: any, private providerMap: any) {}

  async execute({ trackingNumber, status }: { trackingNumber: string, status: string }): Promise<void> {
    // Find delivery by tracking number.
    const delivery: DeliveryEntity | undefined = await this.deliveryRepository.findByTrackingNumber(trackingNumber);

    if (!delivery || FINAL_DELIVERY_STATUSES.includes(delivery.status)) {
      throw new Error('Delivery not found or already in a final status');
    }

    // Convert to internal status using the provider's service mapping.
    const internalStatus: DeliveryStatusValueObject = this.providerMap[delivery.provider!].getInternalStatus(status);

    // If the status hasn't changed, skip updating.
    if (delivery.status === internalStatus) throw new Error('Delivery status is already up to date');

    // Update delivery status.
    delivery.status = internalStatus;
    await this.deliveryRepository.updateById(delivery.id, delivery);
  }
}

export default DeliveryStatusUpdateFromWebhookUseCase;