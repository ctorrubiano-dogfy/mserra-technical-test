import { DeliveryFindResponseDTO } from "../dtos/DeliveryFindDTO"

export interface DeliveryFindUseCaseInterface {
  findById(id: string): Promise<DeliveryFindResponseDTO>
  findByTrackingNumber(trackingNumber: string): Promise<DeliveryFindResponseDTO>
}