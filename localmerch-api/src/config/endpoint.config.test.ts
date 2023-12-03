import { RouteConfig } from '../@types/server/RouteConfig.type';
import { getRouteConfig } from './endpoint.config';

describe('getRouteConfig', () => {
    const routeConfigs: RouteConfig[] = [
        { route: '/admin', method: 'get', apiKeyRole: 'admin' },
        { route: '/shop', method: 'get', apiKeyRole: 'shop' },
        { route: '/user', method: 'get', apiKeyRole: 'user' },
    ];

    it('should return undefined if no route config is found', () => {
        const route = '/not-found';
        const method = 'get';
        const routeConfig = getRouteConfig(route, method, routeConfigs);
        expect(routeConfig).toBeUndefined();
    });

    it('should return undefined if no route config is found for the given method', () => {
        const route = '/admin';
        const method = 'post';
        const routeConfig = getRouteConfig(route, method, routeConfigs);
        expect(routeConfig).toBeUndefined();
    });

    it('should return the route config if one is found', () => {
        const route = '/admin';
        const method = 'get';
        const routeConfig = getRouteConfig(route, method, routeConfigs);
        expect(routeConfig).toEqual(routeConfigs[0]);
    });
});