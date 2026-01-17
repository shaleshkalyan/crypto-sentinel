import app from './app';
import { config } from './config/constants';

app.listen(config.SERVICE_PORT, () => {
  console.log(`service running on port ${config.SERVICE_PORT}`);
});
