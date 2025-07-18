import { DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { ProviderRepositoryInterface } from '../../domain/interfaces/ProviderRepositoryInterface';
import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

class DeliveriesStatusPollUseCase {
  constructor(
    private deliveryRepository: DeliveryRepositoryInterface,
    private providerMap: Record<ProviderValueObject, ProviderRepositoryInterface>
  ) {}

  async execute(): Promise<void> {
    // Fetch all deliveries not in a final status.
    const deliveries: DeliveryEntity[] = await this.deliveryRepository.findAllActive();

    for (const delivery of deliveries) {
      if (!delivery.provider || !delivery.trackingNumber) {
        console.warn(`Skipping delivery ${delivery.id} due to missing provider or tracking number.`);
        continue;
      }

      try {
        // Poll the status from the provider.
        const updatedStatus: DeliveryStatusValueObject = await this.providerMap[delivery.provider].getStatus(delivery.trackingNumber!);

        // If the status hasn't changed, skip updating.
        if (updatedStatus === delivery.status) continue;

        // Update the delivery status.
        delivery.status = updatedStatus;
        await this.deliveryRepository.updateById(delivery.id, delivery);
      } catch (error) {
        console.error(`Error polling status for delivery ${delivery.id}:`, error);
      }
    }
  }
}

export default DeliveriesStatusPollUseCase;
