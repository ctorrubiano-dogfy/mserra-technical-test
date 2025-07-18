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

const providerMap: Record<ProviderValueObject, ProviderRepositoryInterface> = {
  [ProviderValueObject.NRW]: new NRWProviderRepository(),
  [ProviderValueObject.TLS]: new TLSProviderRepository(),
};
const deliveryRepository = new MongoDeliveryRepository();
const randomProviderSelector = new RandomProviderSelector();
const providerSelectUseCase = new ProviderSelectUseCase(randomProviderSelector);
const deliveryCreateUseCase = new DeliveryCreateUseCase(deliveryRepository, providerSelectUseCase, providerMap);
const deliveriesStatusPollUseCase = new DeliveriesStatusPollUseCase(deliveryRepository, providerMap);
const deliveryStatusUpdateFromWebhookUseCase = new DeliveryStatusUpdateFromWebhookUseCase(deliveryRepository, providerMap);

// Container for dependencies
export default {
  deliveryRepository,
  providerMap,
  providerSelectUseCase,
  deliveryCreateUseCase,
  deliveriesStatusPollUseCase,
  deliveryStatusUpdateFromWebhookUseCase,
};
