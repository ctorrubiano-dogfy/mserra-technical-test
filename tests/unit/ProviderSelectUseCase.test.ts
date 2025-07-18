import { describe, it, expect } from 'vitest';
import ProviderSelectUseCase from '../../src/application/useCases/ProviderSelectUseCase';
import { ProviderValueObject } from '../../src/domain/value-objects/ProviderValueObject';
import WeightBasedProviderSelector from '../../src/infrastructure/misc/WeightBasedProviderSelector';
import DeliveryEntity from '../../src/domain/entities/DeliveryEntity';
import { DeliveryStatusValueObject } from '../../src/domain/value-objects/DeliveryStatusValueObject';


describe('ProviderSelectUseCase', () => {
  it('should return NRW provider using the weight selector with order > 20g', () => {
    const fakeSelector = new WeightBasedProviderSelector();
    const useCase = new ProviderSelectUseCase(fakeSelector);

    const input: DeliveryEntity = {
      id: '123',
      status: DeliveryStatusValueObject.PENDING,
    };

    const result = useCase.execute(input);

    expect(result).toBe(ProviderValueObject.NRW);
  });

  it('should return TLS provider using the weight selector with order <= 20g', () => {
    const fakeSelector = new WeightBasedProviderSelector();
    const useCase = new ProviderSelectUseCase(fakeSelector);

    const input: DeliveryEntity = {
      id: '123',
      status: DeliveryStatusValueObject.PENDING,
      weight: 10,
    };

    const result = useCase.execute(input);

    expect(result).toBe(ProviderValueObject.TLS);
  });
});