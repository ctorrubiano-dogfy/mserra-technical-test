import { DeliveryRepositoryInterface } from "../../domain/interfaces/DeliveryRepositoryInterface";
import { DeliveryInfoResponseDTO } from "../dtos/DeliveryInfoResponseDTO";

class DeliveryInfoUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepositoryInterface) {}

  async findById(deliveryId: string): Promise<DeliveryInfoResponseDTO | null> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) return null;
    
    return {
      id: delivery.id,
      status: delivery.status,
      deliveryDate: delivery.deliveryDate,
      address: delivery.address,
      recipientName: delivery.recipientName,
      country: delivery.country,
      postalCode: delivery.postalCode,
      label: delivery.label,
      trackingNumber: delivery.trackingNumber,
      provider: delivery.provider,
      weight: delivery.weight,
      email: delivery.email,
      phoneNumber: delivery.phoneNumber,
    };
  }

  async findByTrackingNumber(trackingNumber: string): Promise<DeliveryInfoResponseDTO | null> {
    const delivery = await this.deliveryRepository.findByTrackingNumber(trackingNumber);
    if (!delivery) return null;

    return {
      id: delivery.id,
      status: delivery.status,
      deliveryDate: delivery.deliveryDate,
      address: delivery.address,
      recipientName: delivery.recipientName,
      country: delivery.country,
      postalCode: delivery.postalCode,
      label: delivery.label,
      trackingNumber: delivery.trackingNumber,
      provider: delivery.provider,
      weight: delivery.weight,
      email: delivery.email,
      phoneNumber: delivery.phoneNumber,
    };
  }
}

export default DeliveryInfoUseCase;