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
    <main class="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-10">

        <!-- Sidebar -->
        <aside class="w-full md:w-64 flex-shrink-0 space-y-10">

          <!-- Categories -->
          <section>
            <h3 class="font-headline font-bold text-on-surface mb-6 text-sm uppercase tracking-widest">Categories</h3>
            <div class="space-y-3">
              @for (f of filters; track f.value) {
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    [checked]="facade.selectedCategory() === f.value"
                    (change)="setFilter(f.value)"
                    class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <span class="font-label text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                    {{ f.label }}
                    <span class="opacity-50">({{ getCount(f.value) }})</span>
                  </span>
                </label>
              }
            </div>
          </section>

          <!-- Frame Shape -->
          <section>
            <h3 class="font-headline font-bold text-on-surface mb-6 text-sm uppercase tracking-widest">Frame Shape</h3>
            <div class="flex flex-wrap gap-2">
              @for (shape of frameShapes; track shape) {
                <button
                  (click)="toggleShape(shape)"
                  class="px-4 py-2 rounded-lg text-xs font-medium font-label transition-colors"
                  [ngClass]="selectedShapes().includes(shape)
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container'"
                >{{ shape }}</button>
              }
            </div>
          </section>

          <!-- Search -->
          <section>
            <h3 class="font-headline font-bold text-on-surface mb-4 text-sm uppercase tracking-widest">Search</h3>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style="font-size:18px;">search</span>
              <input
                type="text"
                placeholder="Search products..."
                [value]="searchQuery()"
                (input)="onSearch($event)"
                class="pl-10 pr-4 py-2.5 bg-surface-container-lowest border-none rounded-lg text-sm w-full focus:ring-2 focus:ring-primary transition-all outline-none"
              />
            </div>
          </section>

        </aside>

        <!-- Main content -->
        <div class="flex-1">
          <div class="flex justify-between items-end mb-10">
            <div>
              <h2 class="text-3xl font-headline font-extrabold text-primary mb-2">Curated Eyewear</h2>
              <p class="text-on-surface-variant font-body">Discover clarity through our artisanal selection.</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-label text-on-surface-variant">{{ displayedProducts().length }} Items</span>
              @if (searchQuery() || facade.selectedCategory() !== 'all') {
                <button
                  (click)="resetFilters()"
                  class="text-sm font-semibold text-primary hover:underline font-label transition-colors">
                  Reset Filters
                </button>
              }
            </div>
          </div>

          <!-- Products grid -->
          @if (displayedProducts().length > 0) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (product of displayedProducts(); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          } @else {
            <div class="text-center py-24">
              <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 bg-surface-container-low">
                <span class="material-symbols-outlined text-on-surface-variant" style="font-size:40px; opacity:0.4;">search</span>
              </div>
              <h3 class="text-xl font-bold text-on-surface mb-2">No products found</h3>
              <p class="text-on-surface-variant">Try changing your filter or search term.</p>
              <button (click)="resetFilters()"
                      class="mt-5 px-6 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold transition-all hover:opacity-90">
                Reset Filters
              </button>
            </div>
          }
        </div>

      </div>
    </main>
  `,
})
export class ProductsComponent {
  facade = inject(ProductFacade);
  searchQuery = signal('');
  selectedShapes = signal<string[]>([]);

  filters: { label: string; value: Filter }[] = [
    { label: 'All Eyewear', value: 'all' },
    { label: 'Prescription Frames', value: 'eyeglass' },
    { label: 'Designer Sunglasses', value: 'sunglass' },
  ];

  frameShapes = ['Aviator', 'Wayfarer', 'Round', 'Rectangle', 'Cat Eye'];

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

  toggleShape(shape: string) {
    this.selectedShapes.update(shapes =>
      shapes.includes(shape) ? shapes.filter(s => s !== shape) : [...shapes, shape]
    );
  }

  onSearch(e: Event) {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }

  resetFilters() {
    this.facade.setCategory('all');
    this.searchQuery.set('');
    this.selectedShapes.set([]);
  }
}
