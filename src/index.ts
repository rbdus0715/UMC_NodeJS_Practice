import app from './app';
import { ENV } from './config/env';

const server = app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
export default server;
