import { DeliveryFindResponseDTO } from "../dtos/DeliveryFindDTO"

export interface DeliveryFindUseCaseInterface {
  findById(id: string): Promise<DeliveryFindResponseDTO>
  findByTrackingNumber(id: string): Promise<DeliveryFindResponseDTO>
}