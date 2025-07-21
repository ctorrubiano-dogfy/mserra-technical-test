import { DeliveryRepositoryInterface } from "../../domain/interfaces/DeliveryRepositoryInterface";
import { DeliveryFindResponseDTO, DeliveryFindRequestDTO } from "../dtos/DeliveryFindDTO";
import { UseCase } from "../interfaces/UseCaseInterface";

import NotFoundError from "../../shared/errors/NotFoundError";
import BadRequestError from "../../shared/errors/BadRequestError";

class DeliveryFindUseCase implements UseCase<DeliveryFindRequestDTO, DeliveryFindResponseDTO> {
  constructor(private readonly deliveryRepository: DeliveryRepositoryInterface) {}

  async execute({ id, trackingNumber }: DeliveryFindRequestDTO): Promise<DeliveryFindResponseDTO> {
    const reference = id || trackingNumber;
    if (!reference) throw new BadRequestError("Reference number must be provided.");

    const delivery = await this.deliveryRepository.find(reference);
    if (!delivery) throw new NotFoundError(`Delivery with ID ${reference} not found.`);

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
    }
  }
}

export default DeliveryFindUseCase;