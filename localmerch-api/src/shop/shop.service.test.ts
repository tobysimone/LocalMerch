import { InsertShop, Shop } from '../@types/database/database.types';
import { GetByIdResult } from '../infrastructure/data/DataProvider.infrastructure';
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

  it('should return the shop data for the given user ID', async () => {
    const shopData: InsertShop = { name: 'TestShop', user_id: '1' };

    await shopService.createShop(shopData);
    const getShop = await shopService.getShopByUserId('1');

    expect(getShop.data).toEqual(shopData);
  });
});