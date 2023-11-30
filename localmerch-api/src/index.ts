import './config/service.config';
import server from './infrastructure/server/server.infrastructure';
import './routes';

server.start();