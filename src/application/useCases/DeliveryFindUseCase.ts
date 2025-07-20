import { DeliveryRepositoryInterface } from "../../domain/interfaces/DeliveryRepositoryInterface";
import { DeliveryFindResponseDTO, DeliveryFindRequestDTO } from "../dtos/DeliveryFindDTO";
import { DeliveryFindUseCaseInterface } from "../interfaces/DeliveryFindUseCaseInterface";

import NotFoundError from "../../shared/errors/NotFoundError";

class DeliveryFindUseCase implements DeliveryFindUseCaseInterface {
  constructor(private readonly deliveryRepository: DeliveryRepositoryInterface) {}

  async execute(request: DeliveryFindRequestDTO): Promise<DeliveryFindResponseDTO> {
    let delivery = null;

    if (request.id) {
      delivery = await this.findById(request.id);
    } else if (request.trackingNumber) {
      delivery = await this.findByTrackingNumber(request.trackingNumber);
    }

    if (!delivery) throw new NotFoundError("Delivery not found.");
    
    return delivery;
  }

  async findById(id: string): Promise<DeliveryFindResponseDTO> {
    const delivery = await this.deliveryRepository.findById(id);
    if (!delivery) throw new NotFoundError(`Delivery with ID ${id} not found.`);
    
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

  async findByTrackingNumber(trackingNumber: string): Promise<DeliveryFindResponseDTO> {
    const delivery = await this.deliveryRepository.findByTrackingNumber(trackingNumber);
    if (!delivery) throw new NotFoundError(`Delivery with tracking number ${trackingNumber} not found.`);

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

export default DeliveryFindUseCase;