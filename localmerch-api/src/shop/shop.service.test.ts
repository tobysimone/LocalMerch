import { InsertShop, Shop } from '../@types/database.types';
import { MockShopDataProvider } from '../infrastructure/supabase/__mocks__/supabase.infrastructure.mock';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let shopService: ShopService;

  beforeEach(() => {
    shopService = new ShopService(new MockShopDataProvider());
  });

  describe('createShop', () => {
    it('should insert a new shop and return the inserted data', async () => {
      const shopData: InsertShop = { name: 'test', user_id: '1' };

      const createdShop = await shopService.createShop(shopData);

      expect(createdShop.data).toEqual(shopData);
    });

    it('should return an error if the shop name is not provided', async () => {
      const shopData: InsertShop = { name: '', user_id: '1' };

      const createdShop = await shopService.createShop(shopData);

      expect(createdShop.error).toEqual(new Error('Shop name is required'));
    });
  });
});