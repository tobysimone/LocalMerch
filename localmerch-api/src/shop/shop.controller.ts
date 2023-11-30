import server from '../infrastructure/server/server.infrastructure';
import { Supabase } from '../infrastructure/supabase/supabase.infrastructure';
import { validate } from '../infrastructure/validation/schemaValidator.infrastructure';
import { createShop } from './shop.schema';
import { ShopService } from './shop.service';

const app = server.get();
const shopService = new ShopService(Supabase);

app.post('/shop', validate(createShop), async (request, response) => {
    const createdShop = await shopService.createShop(request.body);
    return response.status(200).json(createdShop);
});