import { ShopService } from './shop.service';

describe('ShopService', () => {
  let shopService: ShopService;
  let dp = {
    insert: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        single: jest.fn().mockReturnThis(),
      }),
    }),
  }

  beforeEach(() => {
    shopService = new ShopService(dp);
  });

  describe('createShop', () => {
    it('should insert a new shop and return the inserted data', async () => {
      const shopData = { name: 'test' };

      const createdShop = await shopService.createShop(shopData);

      expect(createdShop).toBeDefined();
    });
  });
});