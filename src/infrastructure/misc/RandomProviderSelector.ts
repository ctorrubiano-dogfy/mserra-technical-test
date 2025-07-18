import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { ProviderSelectorInterface } from '../../domain/interfaces/ProviderSelectorInterface';

class RandomProviderSelector implements ProviderSelectorInterface {
  select(): ProviderValueObject {
    const providers: ProviderValueObject[] = Object.values(ProviderValueObject);
    const randomIndex: number = Math.floor(Math.random() * providers.length);
    return providers[randomIndex];
  }
}

export default RandomProviderSelector;