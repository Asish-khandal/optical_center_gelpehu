import { Component, input, output } from '@angular/core';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, NgClass, TitleCasePipe],
  template: `
    <div class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-100 flex flex-col hover:-translate-y-1.5">
      <!-- Image -->
      <div class="relative overflow-hidden aspect-square" style="background: linear-gradient(135deg, #f8fafc, #eff6ff);">
        <img
          [src]="product().imageUrl || 'https://placehold.co/400x400/f1f5f9/334155?text=' + product().name"
          [alt]="product().name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <!-- Category Badge -->
        <span
          class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          [ngClass]="{
            'bg-blue-600 text-white': product().category === 'eyeglass',
            'text-white': product().category === 'sunglass'
          }"
          [style.background]="product().category === 'sunglass' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : ''"
        >
          {{ product().category | titlecase }}
        </span>
        <!-- Out of stock overlay -->
        @if (product().inStock === false) {
          <div class="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <span class="bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Out of Stock</span>
          </div>
        }
      </div>

      <!-- Info -->
      <div class="p-5 flex flex-col flex-1">
        @if (product().brand) {
          <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: #d97706;">{{ product().brand }}</p>
        }
        <h3 class="font-bold text-gray-900 text-base leading-snug mb-1">{{ product().name }}</h3>
        @if (product().description) {
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ product().description }}</p>
        }
        <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-400 font-medium mb-0.5">Price</p>
            <span class="font-extrabold text-xl" style="color: #d97706;">
              NPR {{ product().price | number:'1.0-0' }}
            </span>
          </div>
          <button
            (click)="addToCart.emit(product())"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm"
            style="background: #0a0f1e; color: white;"
            onmouseover="this.style.background='linear-gradient(135deg, #f59e0b, #d97706)'"
            onmouseout="this.style.background='#0a0f1e'"
          >
            <i class="pi pi-eye text-xs"></i> View
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
}
