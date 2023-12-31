import { RouteConfig } from "../../@types/server/RouteConfig.type";

export const routeConfigs: RouteConfig[] = [
    {
        route: '/shop',
        method: 'post',
        apiKeyRole: 'shop'
    },
    {
        route: '/shop',
        method: 'get',
        apiKeyRole: 'shop'
    },
    {
        route: '/user/api-key',
        method: 'post',
        apiKeyRole: 'admin'
    }
];


export function getRouteConfig(route: string, method: string = 'get', routeConfigs: RouteConfig[]): RouteConfig | undefined {
    return routeConfigs.find(config => config.route === route && config.method.toLowerCase() === method.toLowerCase());
}