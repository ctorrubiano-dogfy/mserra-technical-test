import { DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { ProviderRepositoryInterface } from '../../domain/interfaces/ProviderRepositoryInterface';
import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { FINAL_DELIVERY_STATUSES } from '../../domain/constants';
import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

class DeliveryCancelUseCase {
  constructor(
    private deliveryRepositoryInterface: DeliveryRepositoryInterface,
    private providerMap: Record<ProviderValueObject, ProviderRepositoryInterface>,
  ) {}

  async execute(deliveryId: string): Promise<void> {
    // Fetch the delivery entity by ID
    const delivery: DeliveryEntity | undefined = await this.deliveryRepositoryInterface.findById(deliveryId);
    if (!delivery) throw new Error('Delivery not found');

    // Check if the delivery can be canceled based on its status
    if (FINAL_DELIVERY_STATUSES.includes(delivery.status)) {
      throw new Error('Delivery cannot be canceled because it is already in a final status');
    }

    // Use the provider to cancel the shipment
    const providerRepositoryInterface: ProviderRepositoryInterface = this.providerMap[delivery.provider!];
    await providerRepositoryInterface.cancelShipment(delivery.trackingNumber!);

    // Update the delivery status to CANCELED
    delivery.status = DeliveryStatusValueObject.CANCELED;
    await this.deliveryRepositoryInterface.updateById(deliveryId, delivery);
  }
}

export default DeliveryCancelUseCase;