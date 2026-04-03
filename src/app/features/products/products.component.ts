import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductFacade } from '../../core/facades/product.facade';
import { ProductCategory } from '../../core/models/product.model';

type Filter = ProductCategory | 'all';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, ProductCardComponent],
  template: `
    <!-- Page header -->
    <div class="pt-28 pb-16 relative overflow-hidden"
         style="background: linear-gradient(135deg, #06090f 0%, #0a1428 100%);">
      <!-- Sparkles -->
      <div class="sparkle absolute w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none" style="right:10%;top:25%;"></div>
      <div class="sparkle sparkle-delay-2 absolute w-1 h-1 rounded-full bg-amber-300 pointer-events-none" style="left:20%;bottom:20%;"></div>
      <!-- Gold top accent -->
      <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Explore Our</span>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-2">Eyewear Collection</h1>
        <p class="text-slate-400 text-lg">Premium frames for every lifestyle</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Filter bar -->
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
        <div class="flex gap-2 flex-wrap">
          @for (f of filters; track f.value) {
            <button
              (click)="setFilter(f.value)"
              class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              [ngClass]="{
                'text-white shadow-lg shadow-amber-900/25': facade.selectedCategory() === f.value,
                'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-700': facade.selectedCategory() !== f.value
              }"
              [style.background]="facade.selectedCategory() === f.value ? 'linear-gradient(135deg, #f59e0b, #d97706)' : ''"
            >
              {{ f.label }}
              <span class="ml-1.5 text-xs opacity-70">({{ getCount(f.value) }})</span>
            </button>
          }
        </div>

        <!-- Search -->
        <div class="relative">
          <i class="pi pi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search products..."
            [value]="searchQuery()"
            (input)="onSearch($event)"
            class="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all w-56"
            style="--tw-ring-color: #d97706;"
          />
        </div>
      </div>

      <!-- Products grid -->
      @if (displayedProducts().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (product of displayedProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      } @else {
        <div class="text-center py-24">
          <div class="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-amber-100">
            <i class="pi pi-search text-4xl text-amber-300"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">No products found</h3>
          <p class="text-gray-400">Try changing your filter or search term.</p>
          <button (click)="resetFilters()"
                  class="mt-5 px-6 py-2.5 text-white rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            Reset Filters
          </button>
        </div>
      }

      <!-- Result count -->
      @if (displayedProducts().length > 0) {
        <p class="text-gray-400 text-sm mt-8 text-center">
          Showing {{ displayedProducts().length }} product{{ displayedProducts().length !== 1 ? 's' : '' }}
        </p>
      }
    </div>
  `,
})
export class ProductsComponent {
  facade = inject(ProductFacade);
  searchQuery = signal('');

  filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Eyeglasses', value: 'eyeglass' },
    { label: 'Sunglasses', value: 'sunglass' },
  ];

  displayedProducts() {
    const q = this.searchQuery().toLowerCase();
    return this.facade.filteredProducts().filter(
      (p) => !q || p.name.toLowerCase().includes(q) || (p.brand ?? '').toLowerCase().includes(q)
    );
  }

  getCount(filter: Filter): number {
    return filter === 'all'
      ? this.facade.products().length
      : this.facade.products().filter((p) => p.category === filter).length;
  }

  setFilter(f: Filter) {
    this.facade.setCategory(f);
  }

  onSearch(e: Event) {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }

  resetFilters() {
    this.facade.setCategory('all');
    this.searchQuery.set('');
  }
}
