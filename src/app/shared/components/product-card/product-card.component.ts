import { Component, input, output } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, TitleCasePipe, RouterLink],
  styles: [`
    .card { background:#fff; border-radius:1rem; overflow:hidden; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    .card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
    .img-wrap { position:relative; aspect-ratio:4/5; overflow:hidden; background:#f3f4f5; }
    .img-wrap img { width:100%; height:100%; object-fit:cover; transition: transform 0.6s; }
    .card:hover .img-wrap img { transform: scale(1.05); }
    .cat-badge { position:absolute; top:0.75rem; left:0.75rem; padding:0.2rem 0.65rem; border-radius:9999px; font-size:0.65rem; font-weight:800; text-transform:uppercase; letter-spacing:0.07em; color:#fff; }
    .out-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(2px); }
    .wa-btn { position:absolute; bottom:0.75rem; right:0.75rem; width:2.25rem; height:2.25rem; border-radius:9999px; background:#25d366; color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; opacity:0; transform:translateY(6px); transition:opacity 0.2s, transform 0.2s; box-shadow:0 2px 10px rgba(37,211,102,0.4); }
    .card:hover .wa-btn { opacity:1; transform:translateY(0); }
    .wa-btn i { font-size:1rem; }
    .info { padding:1rem 1rem 1.25rem; }
  `],
  template: `
    <div class="card" style="cursor:pointer;" [routerLink]="['/products', product().id]">
      <div class="img-wrap">
        <img
          [src]="product().imageUrl || 'https://placehold.co/400x500/f3f4f5/003331?text=' + product().name"
          [alt]="product().name"
          loading="lazy"
        />
        <!-- Category badge -->
        <span class="cat-badge" [style.background]="product().category === 'sunglass' ? '#4a6360' : '#003331'">
          {{ product().category | titlecase }}
        </span>
        <!-- Out of stock overlay -->
        @if (product().inStock === false) {
          <div class="out-overlay">
            <span style="background:#fff; color:#1e293b; padding:0.35rem 1rem; border-radius:9999px; font-size:0.8rem; font-weight:700;">Out of Stock</span>
          </div>
        }
        <!-- WhatsApp enquiry button -->
        <a
          [href]="waLink()"
          target="_blank"
          rel="noopener"
          class="wa-btn"
          title="Enquire on WhatsApp"
          (click)="$event.stopPropagation()"
        >
          <i class="pi pi-whatsapp"></i>
        </a>
      </div>

      <div class="info">
        @if (product().brand) {
          <p style="font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#94a3b8; margin-bottom:0.25rem;">{{ product().brand }}</p>
        }
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.5rem;">
          <h3 style="font-weight:700; font-size:0.95rem; color:#003331; line-height:1.3;">{{ product().name }}</h3>
          <span style="font-weight:800; font-size:0.9rem; color:#003331; white-space:nowrap;">Nu {{ product().price | number:'1.0-0' }}</span>
        </div>
        @if (product().description) {
          <p style="font-size:0.75rem; color:#64748b; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">{{ product().description }}</p>
        }
        <!-- Call to action row -->
        <div style="display:flex; gap:0.5rem; margin-top:0.85rem;">
          <a
            [href]="waLink()"
            target="_blank"
            rel="noopener"
            style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.4rem; padding:0.55rem; background:#25d366; color:#fff; border-radius:0.6rem; font-size:0.78rem; font-weight:700; text-decoration:none; transition:opacity 0.15s;"
          >
            <i class="pi pi-whatsapp"></i> WhatsApp
          </a>
          <a
            href="tel:+97517635837"
            style="width:2.5rem; display:flex; align-items:center; justify-content:center; background:#f1f5f9; color:#475569; border-radius:0.6rem; transition:background 0.15s; text-decoration:none;"
            title="Call us"
          >
            <span class="material-symbols-outlined" style="font-size:1.1rem;">call</span>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  waLink() {
    const msg = encodeURIComponent(
      `Hello! I'm interested in the *${this.product().name}* (Nu ${this.product().price}). Is it available?`
    );
    return `https://wa.me/97517635837?text=${msg}`;
  }
}
