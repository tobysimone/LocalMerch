import logger from 'pino-http';
import { Logger } from '../../infrastructure/logging/logger.infrastructure';

export const serverLogger = logger({
    pino: Logger.getInstance(),
})