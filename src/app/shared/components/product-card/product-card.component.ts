import { Component, input, output } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, TitleCasePipe],
  template: `
    <div class="group bg-surface-container-lowest rounded-xl overflow-hidden transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-xl">

      <!-- Image -->
      <div class="relative aspect-[4/5] bg-surface-container-low overflow-hidden">
        <img
          [src]="product().imageUrl || 'https://placehold.co/400x500/edeeef/003331?text=' + product().name"
          [alt]="product().name"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <!-- Badge -->
        <span
          class="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full text-on-primary"
          [style.background]="product().category === 'sunglass' ? '#4a6360' : '#003331'"
        >
          {{ product().category | titlecase }}
        </span>
        <!-- Out of stock -->
        @if (product().inStock === false) {
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <span class="bg-white text-on-surface px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Out of Stock</span>
          </div>
        }
        <!-- Hover action -->
        <button
          (click)="addToCart.emit(product())"
          class="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-white shadow-md"
          aria-label="Quick view">
          <span class="material-symbols-outlined" style="font-size:18px;">visibility</span>
        </button>
      </div>

      <!-- Info -->
      <div class="p-6">
        @if (product().brand) {
          <p class="text-xs font-bold uppercase tracking-widest mb-1 font-label text-on-surface-variant">{{ product().brand }}</p>
        }
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-headline font-bold text-lg text-primary leading-snug">{{ product().name }}</h3>
          <span class="font-label font-semibold text-primary shrink-0 ml-2">Nu {{ product().price | number:'1.0-0' }}</span>
        </div>
        @if (product().description) {
          <p class="text-on-surface-variant text-xs font-label mb-4 line-clamp-2">{{ product().description }}</p>
        }
        <button
          (click)="addToCart.emit(product())"
          class="w-full py-3 bg-primary text-on-primary text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-90"
        >
          Quick View
        </button>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
}
