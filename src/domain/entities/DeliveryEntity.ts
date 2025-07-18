import { ProviderValueObject } from '../value-objects/ProviderValueObject'
import { DeliveryStatusValueObject } from '../value-objects/DeliveryStatusValueObject'

class DeliveryEntity {
  constructor(
    public id: string = new Date().toString(),
    public status: DeliveryStatusValueObject = DeliveryStatusValueObject.PENDING,
    public deliveryDate?: Date,
    public address?: string,
    public recipientName?: string,
    public country?: string,
    public postalCode?: string,
    public label?: string,
    public trackingNumber?: string,
    public provider?: ProviderValueObject,
    public weight?: number,
    public email?: string,
    public phoneNumber?: string,
  ) {
  }
}

export default DeliveryEntity;