import app from './app';
import { config } from './config/constants';
import { connectDatabase } from './config/database';

async function startServer() {
  await connectDatabase();

  app.listen(config.SERVICE_PORT, () => {
    console.log(`service running on port ${config.SERVICE_PORT}`);
  });
}

startServer();
