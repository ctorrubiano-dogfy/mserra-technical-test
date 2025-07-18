import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { ProviderSelectorInterface } from '../../domain/interfaces/ProviderSelectorInterface';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';

class ProviderSelectUseCase {
  constructor(private providerSelector: ProviderSelectorInterface) {}

  execute(data?: DeliveryEntity): ProviderValueObject {
    // Use the provider selector to determine the best provider for the delivery.
    return this.providerSelector.select(data);
  }
}

export default ProviderSelectUseCase;