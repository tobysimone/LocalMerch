import server from '../infra/server/server.infra';
import { Supabase } from '../infra/supabase/supabase.infra';
import { ShopService } from './shop.service';

const app = server.get();
const shopService = new ShopService(Supabase);

app.post('/shop', async (request, response) => {
    console.log(request);
    const createdShop = await shopService.createShop(request.body);
    return response.status(200).json(createdShop);
});