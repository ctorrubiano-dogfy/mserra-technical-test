import { DeliveryStatusValueObject } from "../../domain/value-objects/DeliveryStatusValueObject";
import { ProviderValueObject } from "../../domain/value-objects/ProviderValueObject";

export interface DeliveryFindRequestDTO {
  id?: string;
  trackingNumber?: string;
}

// This DTO is used to structure the response for delivery information and add future extensibility
// for additional fields if needed. f.ex: isLate, isInFinalStatus...
export interface DeliveryFindResponseDTO {
  id: string;
  status: DeliveryStatusValueObject;
  deliveryDate?: Date;
  address?: string;
  recipientName?: string;
  country?: string;
  postalCode?: string;
  label?: string;
  trackingNumber?: string;
  provider?: ProviderValueObject;
  weight?: number;
  email?: string;
  phoneNumber?: string; 
}
