import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductFacade } from '../../core/facades/product.facade';
import { ProductCategory } from '../../core/models/product.model';

type Filter = ProductCategory | 'all';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  styles: [`
    .cat-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #475569;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .cat-btn:hover { background: #f1f5f9; color: #1e293b; }
    .cat-btn.active { background: #003331 !important; color: #ffffff !important; font-weight: 700; }
    .cat-btn.active .count-badge { background: rgba(255,255,255,0.2); color: #fff; }
    .count-badge {
      font-size: 0.7rem;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      background: #f1f5f9;
      color: #64748b;
    }
    .shape-btn {
      padding: 0.4rem 0.85rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s;
    }
    .shape-btn:hover { border-color: #94a3b8; color: #1e293b; }
    .shape-btn.active { background: #003331 !important; color: #fff !important; border-color: #003331 !important; }
  `],
  template: `
    <main class="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-10">

        <!-- ===== SIDEBAR ===== -->
        <aside class="w-full md:w-60 flex-shrink-0 space-y-8">

          <!-- Categories -->
          <section>
            <h3 class="text-xs font-bold uppercase tracking-widest mb-4" style="color:#003331;">Categories</h3>
            <div class="space-y-1">
              @for (f of filters; track f.value) {
                <button
                  class="cat-btn"
                  [class.active]="facade.selectedCategory() === f.value"
                  (click)="setFilter(f.value)"
                >
                  <span>{{ f.label }}</span>
                  <span class="count-badge">{{ getCount(f.value) }}</span>
                </button>
              }
            </div>
          </section>

          <!-- Frame Shape -->
          <section>
            <h3 class="text-xs font-bold uppercase tracking-widest mb-4" style="color:#003331;">Frame Shape</h3>
            <div class="flex flex-wrap gap-2">
              @for (shape of frameShapes; track shape) {
                <button
                  class="shape-btn"
                  [class.active]="selectedShapes().includes(shape)"
                  (click)="toggleShape(shape)"
                >{{ shape }}</button>
              }
            </div>
          </section>

          <!-- Search -->
          <section>
            <h3 class="text-xs font-bold uppercase tracking-widest mb-4" style="color:#003331;">Search</h3>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style="font-size:18px;">search</span>
              <input
                type="text"
                placeholder="Search products..."
                [value]="searchQuery()"
                (input)="onSearch($event)"
                class="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 text-slate-700"
                style="--tw-ring-color:#003331;"
              />
            </div>
          </section>

          <!-- In Stock toggle -->
          <section>
            <h3 class="text-xs font-bold uppercase tracking-widest mb-4" style="color:#003331;">Availability</h3>
            <label class="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" [checked]="showInStockOnly()" (change)="showInStockOnly.set(!showInStockOnly())" class="w-4 h-4 accent-teal-700" />
              <span class="text-sm font-medium text-slate-600">In Stock Only</span>
            </label>
          </section>

          <!-- Reset -->
          @if (searchQuery() || facade.selectedCategory() !== 'all' || selectedShapes().length > 0 || showInStockOnly()) {
            <button
              (click)="resetFilters()"
              class="w-full py-2.5 text-sm font-bold rounded-xl border-2 transition-all"
              style="border-color:#003331; color:#003331;"
            >Reset All Filters</button>
          }

        </aside>

        <!-- ===== MAIN ===== -->
        <div class="flex-1">
          <div class="flex justify-between items-end mb-10">
            <div>
              <h2 class="text-3xl font-extrabold mb-1" style="color:#003331; font-family:'Manrope',sans-serif;">Curated Eyewear</h2>
              <p class="text-slate-500 text-sm">Discover clarity through our artisanal selection.</p>
            </div>
            <p class="text-sm text-slate-400">{{ displayedProducts().length }} items</p>
          </div>

          @if (displayedProducts().length > 0) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (product of displayedProducts(); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          } @else {
            <div class="text-center py-24">
              <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-slate-100">
                <span class="material-symbols-outlined text-slate-400" style="font-size:36px;">search</span>
              </div>
              <h3 class="text-xl font-bold text-slate-700 mb-2">No products found</h3>
              <p class="text-slate-400 mb-6">Try changing your filter or search term.</p>
              <button (click)="resetFilters()"
                      class="px-6 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90"
                      style="background:#003331;">
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

  showInStockOnly = signal(false);

  displayedProducts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.facade.filteredProducts().filter((p) => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.brand ?? '').toLowerCase().includes(q);
      const matchStock = this.showInStockOnly() ? p.inStock !== false : true;
      return matchSearch && matchStock;
    });
  });

  getCount(filter: Filter): number {
    return filter === 'all'
      ? this.facade.products().length
      : this.facade.products().filter((p) => p.category === filter).length;
  }

  setFilter(f: Filter) { this.facade.setCategory(f); }

  toggleShape(shape: string) {
    this.selectedShapes.update(s =>
      s.includes(shape) ? s.filter(x => x !== shape) : [...s, shape]
    );
  }

  onSearch(e: Event) {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }

  resetFilters() {
    this.facade.setCategory('all');
    this.searchQuery.set('');
    this.selectedShapes.set([]);
    this.showInStockOnly.set(false);
  }
}
