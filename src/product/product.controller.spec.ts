import { Test } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

describe('Products Controller', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('Product Feed', () => {
    it('should convert json to csv', async () => {
      const result = { success: true, message: 'Product feed converted as CSV' };
      expect(await productsController.getFeed()).toStrictEqual(result);
    });
  });
});
