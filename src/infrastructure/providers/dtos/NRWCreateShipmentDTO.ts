export interface NRWCreateShipmentDTO {
  serviceType: string; // e.g., 'standard', 'express'
  recipientName: string;
  address: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  email?: string;
  weight?: number;
  deliveryDate?: Date; // Optional field for the delivery date
}