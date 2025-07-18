import cron from 'node-cron';
import dependenciesContainer from '../container';

async function pollDeliveriesCronJob() {
  try {
    await dependenciesContainer.deliveriesStatusPollUseCase.execute();
    console.log('✅ Polling completado correctamente.');
  } catch (error) {
    console.error('❌ Error durante el polling:', error);
  }
}

function startNodeCronScheduler() {
  cron.schedule('* * * * *', pollDeliveriesCronJob);
  console.log('✅ NodeCronScheduler iniciado')
}

export  { startNodeCronScheduler  };