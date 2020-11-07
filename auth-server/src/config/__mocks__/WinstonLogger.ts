import winstonMock from '../../__mocks__/winston';
import EnvironmentVariablesManager from '../../shared/EnvironmentVariablesManager';

export default () => ({
  logger: winstonMock().createLogger(),
  envs: new EnvironmentVariablesManager()
});
