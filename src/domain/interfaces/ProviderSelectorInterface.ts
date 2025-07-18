import { ProviderValueObject } from '../value-objects/ProviderValueObject';
import DeliveryEntity from '../entities/DeliveryEntity';

export interface ProviderSelectorInterface {
  select(data?: DeliveryEntity): ProviderValueObject;
}
