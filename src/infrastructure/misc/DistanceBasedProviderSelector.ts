import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { ProviderSelectorInterface } from '../../domain/interfaces/ProviderSelectorInterface';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

class DistanceBasedProviderSelector implements ProviderSelectorInterface {

  select(data: DeliveryEntity): ProviderValueObject {
    const providers: ProviderValueObject[] = Object.values(ProviderValueObject);

    // Simulate distance calculation.
    // In a real-world scenario, you would calculate the distance based on the delivery address.
    const distances: Record<ProviderValueObject, number> = {
      [ProviderValueObject.NRW]: Math.random() * 100, // Simulated distance
      [ProviderValueObject.TLS]: Math.random() * 100, // Simulated distance
    };

    providers.sort((a, b) => distances[a] - distances[b]);

    return providers[0];
  }
}

export default DistanceBasedProviderSelector;