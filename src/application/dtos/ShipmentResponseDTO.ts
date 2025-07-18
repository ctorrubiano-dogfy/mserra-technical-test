import { DeliveryStatusValueObject } from "../../domain/value-objects/DeliveryStatusValueObject";

export interface ShipmentResponseDTO {
  label: string;
  trackingNumber: string;
  deliveryDate?: Date;
  status?: DeliveryStatusValueObject;
}