import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { ProviderSelectorInterface } from '../../domain/interfaces/ProviderSelectorInterface';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

class WeightBasedProviderSelector implements ProviderSelectorInterface {
  select(data: DeliveryEntity): ProviderValueObject {
    if (data.weight! > 20) {
      return ProviderValueObject.NRW;
    } else {
      return ProviderValueObject.TLS;
    }
  }
}

export default WeightBasedProviderSelector;