import server from '../infra/server/server.infra';
import { Supabase } from '../infra/supabase/supabase.infra';
import { ShopService } from './shop.service';

const app = server.get();
const { createShop } = new ShopService(Supabase);

app.post('/shop', (request, response) => {
    createShop(request.body).then((result) => {});    
});