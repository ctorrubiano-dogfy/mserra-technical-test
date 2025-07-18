export interface TLSCreateShipmentDTO {
  serviceRequested: string;
  recipientName: string;
  address: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  email?: string;
  packageWeight?: number;
  deliveryDate?: Date; // Optional field for the delivery date
}