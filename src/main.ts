import { connectToMongo } from './infrastructure/persistence/MongoDeliveryRepository';
import { startFastify } from './infrastructure/http/FastifyServer';
import { startNodeCronScheduler } from './infrastructure/misc/NodeCronScheduler';


export async function startApp() {
  await connectToMongo();
  await startFastify();
  startNodeCronScheduler();
}

startApp();
