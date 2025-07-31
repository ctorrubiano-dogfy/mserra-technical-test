import { MongoDeliveryRepository } from './persistence/MongoDeliveryRepository';
import { ProviderValueObject } from '../domain/value-objects/ProviderValueObject';
import { ProviderRepositoryInterface } from '../domain/interfaces/ProviderRepositoryInterface';
import NRWProviderRepository from './providers/NRWProviderRepository';
import ProviderSelectUseCase from '../application/useCases/ProviderSelectUseCase';
import DeliveryCreateUseCase from '../application/useCases/DeliveryCreateUseCase';
import DeliveriesStatusPollUseCase from '../application/useCases/DeliveriesStatusPollUseCase';
import TLSProviderRepository from './providers/TLSProviderRepository';
import DeliveryStatusUpdateFromWebhookUseCase from '../application/useCases/DeliveryStatusUpdateFromWebhookUseCase';
import RandomProviderSelector from './misc/RandomProviderSelector';
import DistanceBasedProviderSelector from './misc/DistanceBasedProviderSelector';
import DeliveryFindUseCase from '../application/useCases/DeliveryFindUseCase';
import DeliveryDeleteUseCase from '../application/useCases/DeliveryDeleteUseCase';

const providerMap: Record<ProviderValueObject, ProviderRepositoryInterface> = {
  [ProviderValueObject.NRW]: new NRWProviderRepository(),
  [ProviderValueObject.TLS]: new TLSProviderRepository(),
};
const deliveryRepository = new MongoDeliveryRepository();
const randomProviderSelector = new RandomProviderSelector();
const distanceBasedProviderSelector = new DistanceBasedProviderSelector();
const providerSelectUseCase = new ProviderSelectUseCase(distanceBasedProviderSelector);
const deliveryCreateUseCase = new DeliveryCreateUseCase(deliveryRepository, providerSelectUseCase, providerMap);
const deliveriesStatusPollUseCase = new DeliveriesStatusPollUseCase(deliveryRepository, providerMap);
const deliveryStatusUpdateFromWebhookUseCase = new DeliveryStatusUpdateFromWebhookUseCase(deliveryRepository, providerMap);
const deliveryFindUseCase = new DeliveryFindUseCase(deliveryRepository);
const deliveryDeleteUseCase = new DeliveryDeleteUseCase(deliveryRepository);

// Container for dependencies
export default {
  deliveryRepository,
  providerMap,
  providerSelectUseCase,
  deliveryCreateUseCase,
  deliveriesStatusPollUseCase,
  deliveryStatusUpdateFromWebhookUseCase,
  deliveryFindUseCase,
  deliveryDeleteUseCase,
};
