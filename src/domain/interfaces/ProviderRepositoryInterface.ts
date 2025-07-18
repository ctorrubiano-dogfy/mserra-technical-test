
import { ShipmentCreateDTO } from '../../application/dtos/ShipmentCreateDTO'
import { DeliveryStatusValueObject } from '../value-objects/DeliveryStatusValueObject'

export interface ProviderRepositoryInterface {
  createShipment(data: ShipmentCreateDTO): Promise<{ label: string,  trackingNumber: string }>
  getStatus(trackingNumber: string): Promise<DeliveryStatusValueObject>
}
