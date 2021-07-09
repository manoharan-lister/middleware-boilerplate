import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { createObjectCsvWriter } from 'csv-writer';
import { products } from './data/product';

@Injectable()
export class ProductsService {
  findOne(id: string): ProductDto {
    return { id, name: 'Red Dress', stock: 10, price: 12.5 };
  }

  async getProductFeed() {
    // const data = await this.getProductFromATG();
    const data = products;
    const csvWriter = createObjectCsvWriter({
      path: 'C:\\Lister\\Tryouts\\chicos\\src\\product_feed\\product.csv',
      header: [
        { id: 'variant-id', title: 'variant-id' },
        { id: 'listing-id', title: 'listing-id' },
        { id: 'name', title: 'name' },
        { id: 'forms', title: 'forms' },
        { id: 'form-id_colour', title: 'form-id_colour' },
        { id: 'form-value_colour', title: 'form-value_colour' },
        { id: 'form-swatch_colour', title: 'form-swatch_colour' },
        { id: 'form-id_size', title: 'form-id_size' },
        { id: 'form-value_size', title: 'form-value_size' },
        { id: 'price-now_GBP_GB', title: 'price-now_GBP_GB' },
        { id: 'price-was_GBP_GB', title: 'price-was_GBP_GB' },
        { id: 'price-now_EUR_FR', title: 'price-now_EUR_FR' },
        { id: 'available', title: 'available' },
        { id: 'low-on-stock', title: 'low-on-stock' },
        { id: 'max-orderable-quantity', title: 'max-orderable-quantity' },
        { id: 'quantity', title: 'quantity' },
        { id: 'barcode', title: 'barcode' },
        { id: 'video-url', title: 'video-url' },
        { id: 'image_0', title: 'image_0' },
        { id: 'image_1', title: 'image_1' },
        { id: 'default-variant-id', title: 'default-variant-id' },
        { id: 'brand', title: 'brand' },
        { id: 'description', title: 'description' },
        { id: 'description-raw', title: 'description-raw' },
        { id: 'web-url', title: 'web-url' },
        { id: 'link-title_0', title: 'link-title_0' },
        { id: 'link-url_0', title: 'link-url_0' },
        { id: 'link-title_1', title: 'link-title_1' },
        { id: 'link-url_1', title: 'link-url_1' },
        { id: 'promotion-badge_0', title: 'promotion-badge_0' },
        { id: 'promotion-message_0', title: 'promotion-message_0' },
        { id: 'category-id_0', title: 'category-id_0' },
        { id: 'category-id_1', title: 'category-id_1' },
        { id: 'review-rating', title: 'review-rating' },
        { id: 'review-count', title: 'review-count' },
        { id: 'filter-attr-name_0', title: 'filter-attr-name_0' },
        { id: 'filter-attr-value_0', title: 'filter-attr-value_0' },
        { id: 'Gifting-Available', title: 'Gifting-Available' },
        { id: 'Gift-Id', title: 'Gift-Id' },
      ],
    });
    csvWriter.writeRecords(data).then(() => console.log('Data uploaded into csv successfully'));
    return { success: true, message: 'Product feed converted as CSV' };
  }
}
