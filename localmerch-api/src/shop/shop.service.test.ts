import { ShopService } from './shop.service';

describe('ShopService', () => {
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
        // Arrange
        const shopData = { name: 'test' };

        // Act
        const createdShop = await shopService.createShop(shopData);

        // Assert
        expect(createdShop).toBeDefined();
        // Add more assertions based on your expected behavior
      });
    });
  })
});