// This file can be separated into different files, but for simplicity, we keep it all fastify things here.
import Fastify, { FastifyInstance } from 'fastify';

import { DeliveryCreateDTO } from '../../application/dtos/DeliveryCreateDTO';
import { DeliveryFindRequestDTO } from '../../application/dtos/DeliveryFindDTO';
import { ShipmentResponseDTO } from '../../application/dtos/ShipmentResponseDTO';
import { DeliveryDeleteRequestDTO } from '../../application/dtos/DeliveryDeleteDTO';
import dependenciesContainer from '../container';

import HttpError from '../../shared/errors/HttpError';

const fastify = Fastify({ logger: false });

// TODO: Move these interfaces to a separate file.
interface TLSWebhookPayload {
  trackingNumber: string;
  status: string;
}

interface NRWWebhookPayload {
  trackingNumber: string;
  status: string;
}

async function deliveryRoutes(fastify: FastifyInstance, opts: any) {

  fastify.post('/deliveries', async (req, reply) => {
    const body: DeliveryCreateDTO = req.body as DeliveryCreateDTO;
    const delivery: ShipmentResponseDTO = await dependenciesContainer.deliveryCreateUseCase.execute(body);
    // const delivery: new DeliveryCreateUseCase(deliveryRepository, providerSelectUseCase, providerMap).execute(body);
    reply.code(201).send(delivery);
  });

  fastify.post('/deliveries/poll', async (req, reply) => {
    await dependenciesContainer.deliveriesStatusPollUseCase.execute();
    reply.code(204).send();
  });

  fastify.post('/webhooks/tls', async (req, reply) => {
    const body: TLSWebhookPayload = req.body as TLSWebhookPayload;
    const { trackingNumber, status } = body;

    await dependenciesContainer.deliveryStatusUpdateFromWebhookUseCase.execute({ trackingNumber, status });

    reply.code(200).send();
  });

  fastify.post('/webhooks/nrw', async (req, reply) => {
    const body: NRWWebhookPayload = req.body as NRWWebhookPayload;
    const { trackingNumber, status } = body;

    await dependenciesContainer.deliveryStatusUpdateFromWebhookUseCase.execute({ trackingNumber, status });

    reply.code(200).send();
  });

  fastify.get('/deliveries/:id', async (req, reply) => {
    const { id } = req.params as DeliveryFindRequestDTO;

    try {
      const delivery = await dependenciesContainer.deliveryFindUseCase.execute({ id });

      return delivery;
    } catch (error) {
      if (error instanceof HttpError) {
        return reply.code(error.statusCode).send({ error });
      }

      return reply.code(500).send({ error });
    }
  });

  fastify.get('/deliveries/tracking/:trackingNumber', async (req, reply) => {
    const { trackingNumber } = req.params as DeliveryFindRequestDTO;

    try {
      const delivery = await dependenciesContainer.deliveryFindUseCase.execute({ trackingNumber });

      return delivery;
    } catch (error) {
      if (error instanceof HttpError) {
        return reply.code(error.statusCode).send({ error });
      }

      return reply.code(500).send({ error });
    }
  });

  fastify.delete('/deliveries/:id', async (req, reply) => {
    const { id } = req.params as { id: string };

    try {
      const result = await dependenciesContainer.deliveryDeleteUseCase.execute({ id });
      return reply.code(200).send(result);
    } catch (error) {
      if (error instanceof HttpError) {
        return reply.code(error.statusCode).send({ 
          success: false, 
          message: error.message,
          error: error.name
        });
      }

      return reply.code(500).send({ 
        success: false, 
        message: 'An unexpected error occurred',
        error: (error as Error).message
      });
    }
  });
}

async function start() {
  try {
    await fastify.register(deliveryRoutes);
    await fastify.listen({ port: 3000 });
    console.log('✅ Fastify server listening at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

export { start as startFastify, deliveryRoutes };