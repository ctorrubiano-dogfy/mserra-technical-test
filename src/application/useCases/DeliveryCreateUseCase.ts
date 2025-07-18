import { ShipmentCreateDTO } from '../dtos/ShipmentCreateDTO';
import { ShipmentResponseDTO } from '../dtos/ShipmentResponseDTO';
import { DeliveryCreateDTO } from '../dtos/DeliveryCreateDTO';
import { ProviderValueObject } from '../../domain/value-objects/ProviderValueObject';
import { ProviderRepositoryInterface } from '../../domain/interfaces/ProviderRepositoryInterface';
import { DeliveryRepositoryInterface } from '../../domain/interfaces/DeliveryRepositoryInterface';
import { DeliveryStatusValueObject } from '../../domain/value-objects/DeliveryStatusValueObject';
import DeliveryEntity from '../../domain/entities/DeliveryEntity';
import ProviderSelectUseCase from './ProviderSelectUseCase';

class DeliveryCreateUseCase {
  constructor(
    private deliveryRepository: DeliveryRepositoryInterface,
    private providerSelectUseCase: ProviderSelectUseCase,
    private providerMap: Record<ProviderValueObject, ProviderRepositoryInterface>,
  ) {}

  async execute(deliveryData: DeliveryCreateDTO): Promise<ShipmentResponseDTO> {
    // Create a Delivery entity base data.
    const delivery: DeliveryEntity = new DeliveryEntity(
      deliveryData.id,
      DeliveryStatusValueObject.LABEL_GENERATED,
      new Date(),
      deliveryData.address,
      deliveryData.recipientName,
      deliveryData.country,
      deliveryData.postalCode
    );

    // Select the provider based on the delivery data and create the shipment.
    const selectedProvider: ProviderValueObject = this.providerSelectUseCase.execute(delivery);
    const providerRepository: ProviderRepositoryInterface = this.providerMap[selectedProvider];

    // Prepare the shipment creation data
    const createShipmentData: ShipmentCreateDTO = {
      recipientName: delivery.recipientName!,
      address: delivery.address!,
      postalCode: delivery.postalCode!,
      country: delivery.country!,
      email: delivery.email!,
      weight: delivery.weight!,
    };

    // Create the shipment using the selected provider.
    const shipment: ShipmentResponseDTO = await providerRepository.createShipment(createShipmentData);
    if (!shipment) throw new Error('Failed to create shipment');

    // Update the delivery entity with the shipment details.
    delivery.label = shipment.label;
    delivery.trackingNumber = shipment.trackingNumber;
    delivery.provider = selectedProvider;

    // Save the delivery entity to the repository.
    await this.deliveryRepository.create(delivery);

    // Return the shipment response.
    return shipment;
  }
}

export default DeliveryCreateUseCase;