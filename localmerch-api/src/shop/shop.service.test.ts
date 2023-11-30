import { MockShopDataProvider } from '../infra/supabase/__mocks__/supabase.infra.mock';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let shopService: ShopService;

  beforeEach(() => {
    shopService = new ShopService(new MockShopDataProvider());
  });

  describe('createShop', () => {
    it('should insert a new shop and return the inserted data', async () => {
      const shopData = { name: 'test' };

      const createdShop = await shopService.createShop(shopData);

      expect(createdShop).toEqual(shopData);
    });
  });
});