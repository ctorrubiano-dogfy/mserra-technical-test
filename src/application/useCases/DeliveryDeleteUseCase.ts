import { DeliveryDeleteRequestDTO, DeliveryDeleteResponseDTO } from "../dtos/DeliveryDeleteDTO";
import { UseCase } from "../interfaces/UseCaseInterface";

import { DeliveryRepositoryInterface } from "../../domain/interfaces/DeliveryRepositoryInterface";

import NotFoundError from "../../shared/errors/NotFoundError";
import BadRequestError from "../../shared/errors/BadRequestError";

class DeliveryDeleteUseCase implements UseCase<DeliveryDeleteRequestDTO, DeliveryDeleteResponseDTO> {
  constructor(private readonly deliveryRepository: DeliveryRepositoryInterface) {}

  async execute({ id }: DeliveryDeleteRequestDTO): Promise<DeliveryDeleteResponseDTO> {
    if (!id) {
      throw new BadRequestError("Delivery ID must be provided.");
    }

    try {
      // First check if the delivery exists
      await this.deliveryRepository.find(id);
      // If no error was thrown, proceed with deletion
      await this.deliveryRepository.deleteById(id);
      
      return {
        success: true,
        message: `Delivery with ID ${id} was successfully deleted.`
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error; // Re-throw NotFoundError
      }
      throw new Error(`Failed to delete delivery: ${(error as Error).message}`);
    }
  }
}

export default DeliveryDeleteUseCase;
