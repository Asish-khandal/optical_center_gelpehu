import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProductFacade } from '../../core/facades/product.facade';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  styles: [`
    .badge { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.7rem; border-radius: 9999px; }
    .in-stock { background: #dcfce7; color: #166534; }
    .out-stock { background: #fee2e2; color: #991b1b; }
    .wa-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #25d366; color: #fff; font-weight: 700; padding: 0.9rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-size: 1rem; transition: background 0.15s; }
    .wa-btn:hover { background: #22c55e; }
    .call-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #f1f5f9; color: #003331; font-weight: 700; padding: 0.9rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-size: 1rem; transition: background 0.15s; }
    .call-btn:hover { background: #e2e8f0; }
  `],
  template: `
    <main class="pt-24 pb-20 max-w-7xl mx-auto px-6">

      <!-- Back -->
      <a routerLink="/products" class="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors" style="color:#003331;">
        <span class="material-symbols-outlined" style="font-size:20px;">arrow_back</span>
        Back to Shop
      </a>

      @if (product()) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <!-- Image -->
          <div class="rounded-3xl overflow-hidden bg-slate-100 aspect-square">
            @if (product()!.imageUrl) {
              <img [src]="product()!.imageUrl" [alt]="product()!.name"
                   class="w-full h-full object-cover" />
            } @else {
              <div class="w-full h-full flex items-center justify-center bg-slate-100">
                <span class="text-slate-300 text-sm font-medium">No Image</span>
              </div>
            }
          </div>

          <!-- Info -->
          <div class="space-y-6">

            <div>
              @if (product()!.brand) {
                <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color:#003331;">{{ product()!.brand }}</p>
              }
              <h1 class="text-4xl font-extrabold text-slate-800 mb-3" style="font-family:'Manrope',sans-serif;">{{ product()!.name }}</h1>
              <div class="flex items-center gap-3 flex-wrap">
                <span class="text-3xl font-bold" style="color:#003331;">Nu {{ product()!.price | number }}</span>
                <span class="badge" [class]="product()!.inStock !== false ? 'in-stock' : 'out-stock'">
                  {{ product()!.inStock !== false ? 'In Stock' : 'Out of Stock' }}
                </span>
                <span class="badge" style="background:#e0f2fe; color:#0369a1;">
                  {{ product()!.category === 'eyeglass' ? 'Eyeglasses' : 'Sunglasses' }}
                </span>
              </div>
            </div>

            @if (product()!.description) {
              <p class="text-slate-600 leading-relaxed text-base border-t border-slate-100 pt-6">{{ product()!.description }}</p>
            }

            <!-- Features -->
            <div class="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div class="text-center p-4 bg-slate-50 rounded-2xl">
                <span class="material-symbols-outlined block mb-1" style="color:#003331; font-size:28px;">verified</span>
                <p class="text-xs font-semibold text-slate-600">Certified Quality</p>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-2xl">
                <span class="material-symbols-outlined block mb-1" style="color:#003331; font-size:28px;">build_circle</span>
                <p class="text-xs font-semibold text-slate-600">Free Adjustment</p>
              </div>
              <div class="text-center p-4 bg-slate-50 rounded-2xl">
                <span class="material-symbols-outlined block mb-1" style="color:#003331; font-size:28px;">local_shipping</span>
                <p class="text-xs font-semibold text-slate-600">Easy Returns</p>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-3 border-t border-slate-100 pt-6">
              <a [href]="waLink()" target="_blank" class="wa-btn">
                <i class="pi pi-whatsapp" style="font-size:1.25rem;"></i>
                Enquire on WhatsApp
              </a>
              <a href="tel:+97517635837" class="call-btn">
                <span class="material-symbols-outlined" style="font-size:20px;">call</span>
                Call: +975-17635837
              </a>
              <a routerLink="/contact" class="call-btn" style="border: 1.5px solid #003331;">
                <span class="material-symbols-outlined" style="font-size:20px;">mail</span>
                Send an Enquiry
              </a>
            </div>

          </div>
        </div>

        <!-- Related Products -->
        @if (related().length > 0) {
          <div class="mt-20">
            <h2 class="text-2xl font-extrabold mb-8" style="color:#003331; font-family:'Manrope',sans-serif;">You May Also Like</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              @for (p of related(); track p.id) {
                <a [routerLink]="['/products', p.id]" class="group block rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-shadow">
                  <div class="aspect-square bg-slate-100 overflow-hidden">
                    @if (p.imageUrl) {
                      <img [src]="p.imageUrl" [alt]="p.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    } @else {
                      <div class="w-full h-full flex items-center justify-center bg-slate-100">
                        <span class="text-slate-300 text-xs">No Image</span>
                      </div>
                    }
                  </div>
                  <div class="p-4">
                    <p class="font-bold text-slate-800 text-sm truncate">{{ p.name }}</p>
                    <p class="text-sm font-semibold mt-1" style="color:#003331;">Nu {{ p.price | number }}</p>
                  </div>
                </a>
              }
            </div>
          </div>
        }

      } @else if (notFound()) {
        <div class="text-center py-32">
          <span class="material-symbols-outlined text-slate-300 block mb-4" style="font-size:80px;">search_off</span>
          <h2 class="text-2xl font-bold text-slate-600 mb-2">Product not found</h2>
          <a routerLink="/products" class="inline-block mt-4 px-6 py-3 text-white rounded-xl font-bold" style="background:#003331;">Browse All Products</a>
        </div>
      } @else {
        <!-- Loading -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div class="rounded-3xl bg-slate-100 aspect-square animate-pulse"></div>
          <div class="space-y-4 pt-4">
            <div class="h-6 bg-slate-100 rounded animate-pulse w-1/3"></div>
            <div class="h-10 bg-slate-100 rounded animate-pulse w-2/3"></div>
            <div class="h-8 bg-slate-100 rounded animate-pulse w-1/4"></div>
            <div class="h-24 bg-slate-100 rounded animate-pulse mt-6"></div>
          </div>
        </div>
      }

    </main>
  `,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private facade = inject(ProductFacade);

  private id = toSignal(this.route.paramMap.pipe(map(p => p.get('id') ?? '')));

  product = computed(() => {
    const id = this.id();
    const all = this.facade.products();
    if (!id) return null;
    return all.find(p => p.id === id) ?? null;
  });

  notFound = computed(() => {
    const id = this.id();
    const all = this.facade.products();
    return all.length > 0 && id ? !all.find(p => p.id === id) : false;
  });

  related = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.facade.products()
      .filter(x => x.id !== p.id && x.category === p.category)
      .slice(0, 4);
  });

  waLink = computed(() => {
    const p = this.product();
    if (!p) return 'https://wa.me/97517635837';
    const msg = encodeURIComponent(
      `Hello Himalayan Optical Center, I am interested in *${p.name}*${p.brand ? ' by ' + p.brand : ''} priced at Nu ${p.price}. Please provide more details.`
    );
    return `https://wa.me/97517635837?text=${msg}`;
  });
}
