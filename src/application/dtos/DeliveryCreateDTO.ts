export interface DeliveryCreateDTO {
  id: string;
  address: string;
  postalCode: string;
  country: string;
  recipientName: string;
  weight: number;
  email: string;
  phoneNumber: string;
}
