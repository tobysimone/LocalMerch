import { InsertCategory } from '../@types/database/database.types';
import { MockCategoryDataProvider } from '../infrastructure/supabase/__mocks__/supabase.infrastructure.mock';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService(new MockCategoryDataProvider());
  });

  describe('createCategory', () => {
    it('should insert a new category and return the inserted data', async () => {
      const categoryData: InsertCategory = { name: 'test', slug: 'test' };

      const createdCategory = await categoryService.createCategory(categoryData);

      expect(createdCategory.data).toEqual(categoryData);
    });
  });
});