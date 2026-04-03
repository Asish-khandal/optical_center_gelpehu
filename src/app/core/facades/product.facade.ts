import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../services/product.service';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private productService = inject(ProductService);

  // All products from Firestore as a signal
  readonly products = toSignal(this.productService.getProducts(), { initialValue: [] as Product[] });

  // Active category filter
  readonly selectedCategory = signal<ProductCategory | 'all'>('all');

  // Filtered products derived signal
  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all'
      ? this.products()
      : this.products().filter((p) => p.category === cat);
  });

  // Featured products (first 4)
  readonly featuredProducts = computed(() => this.products().slice(0, 4));

  readonly isLoading = computed(() => this.products().length === 0);

  setCategory(cat: ProductCategory | 'all'): void {
    this.selectedCategory.set(cat);
  }

  addProduct(product: Omit<Product, 'id'>): Promise<void> {
    return this.productService.addProduct(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
