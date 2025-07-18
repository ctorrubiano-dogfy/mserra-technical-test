import { ProviderRepositoryInterface } from '../../domain/interfaces/ProviderRepositoryInterface';
import { ShipmentCreateDTO } from '../../application/dtos/ShipmentCreateDTO';
import { ShipmentResponseDTO } from '../../application/dtos/ShipmentResponseDTO';
import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import { TLSCreateShipmentDTO } from './dtos/TLSCreateShipmentDTO';

class TLSProviderRepository implements ProviderRepositoryInterface {
  async createShipment(data: ShipmentCreateDTO): Promise<ShipmentResponseDTO> {
    // Map to the expected format for TLS
    const TLSShipmentData: TLSCreateShipmentDTO = {
      serviceRequested: 'standard',
      recipientName: data.recipientName,
      address: data.address,
      postalCode: data.postalCode,
      country: data.country,
    };

    // Simulate creating a shipment with TLS pass
    console.info('API Request to TLS with data:', TLSShipmentData);

    // Simulate creating a shipment with TLS
    const trackingNumber: string = `TLS-${Math.floor(Math.random() * 100)}`;

    // Return the shipment response
    const shipmentResponse: ShipmentResponseDTO = {
      label: `LABEL_DATA_FOR_${trackingNumber}`,
      trackingNumber,
    };

    return shipmentResponse;
  }

  async getStatus(trackingNumber: string): Promise<DeliveryStatusValueObject> {
    // Simulate checking the status of a shipment with NRW
    // For simplicity, we will return a random status from DeliveryStatus value-objects
    const statuses: DeliveryStatusValueObject[] = Object.values(DeliveryStatusValueObject);
    const randomIndex: number = Math.floor(Math.random() * statuses.length);
    const status: DeliveryStatusValueObject = statuses[randomIndex];

    return status;
  }

  getInternalStatus(status: string): DeliveryStatusValueObject {
    // Convert external status to internal status
    switch (status) {
      case 'pending':
        return DeliveryStatusValueObject.PENDING;
      case 'in_transit':
        return DeliveryStatusValueObject.IN_TRANSIT;
      case 'delivered':
        return DeliveryStatusValueObject.DELIVERED;
      case 'failed':
        return DeliveryStatusValueObject.FAILED;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }
}

export default TLSProviderRepository;
