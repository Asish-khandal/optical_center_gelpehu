import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductFacade } from '../../core/facades/product.facade';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  template: `
    <!-- ===== HERO ===== -->
    <section class="relative min-h-screen flex items-center overflow-hidden"
             style="background: linear-gradient(135deg, #06090f 0%, #0a1428 50%, #0d1e48 100%);">

      <!-- Animated sparkle dots -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="sparkle absolute w-1.5 h-1.5 rounded-full bg-amber-400" style="left:8%;top:15%;"></div>
        <div class="sparkle sparkle-delay-1 absolute w-1 h-1 rounded-full bg-amber-300" style="left:20%;top:30%;"></div>
        <div class="sparkle sparkle-delay-2 absolute w-1.5 h-1.5 rounded-full bg-white" style="left:75%;top:18%;"></div>
        <div class="sparkle sparkle-delay-3 absolute w-1 h-1 rounded-full bg-amber-400" style="left:88%;top:45%;"></div>
        <div class="sparkle sparkle-delay-1 absolute w-1 h-1 rounded-full bg-amber-200" style="left:12%;top:68%;"></div>
        <div class="sparkle sparkle-delay-4 absolute w-2 h-2 rounded-full bg-amber-300" style="left:55%;top:22%;"></div>
        <div class="sparkle sparkle-delay-2 absolute w-1 h-1 rounded-full bg-white" style="left:65%;top:78%;"></div>
        <div class="sparkle sparkle-delay-3 absolute w-1.5 h-1.5 rounded-full bg-amber-400" style="left:35%;top:85%;"></div>
      </div>

      <!-- Gradient orbs -->
      <div class="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
           style="background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
           style="background: radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%);"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- Left: Text content -->
          <div>
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/10 mb-8">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span class="text-amber-300 text-sm font-medium tracking-wide">Bhutan's Premier Eyewear Destination</span>
            </div>

            <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              See The World
              <span class="block" style="background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Clearly &amp; In Style
              </span>
            </h1>

            <p class="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Premium eyeglasses, sunglasses &amp; professional eye care in Gelephu, Bhutan — crafted for those who see the world differently.
            </p>

            <div class="flex flex-wrap gap-4">
              <a routerLink="/products"
                 class="group px-8 py-4 text-white rounded-xl font-bold text-base transition-all shadow-xl shadow-amber-900/30 flex items-center gap-3 active:scale-95 hover:opacity-90"
                 style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                <i class="pi pi-th-large"></i>
                Browse Eyewear
                <i class="pi pi-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a href="https://wa.me/97517635837" target="_blank"
                 class="px-8 py-4 bg-white/5 backdrop-blur border border-white/15 text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all flex items-center gap-3">
                <i class="pi pi-whatsapp text-green-400"></i>
                WhatsApp Us
              </a>
            </div>

            <!-- Stats -->
            <div class="flex gap-10 mt-14 pt-8 border-t border-white/10">
              @for (stat of stats; track stat.label) {
                <div>
                  <p class="text-3xl sm:text-4xl font-bold text-white">{{ stat.value }}</p>
                  <p class="text-slate-400 text-sm mt-0.5">{{ stat.label }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Right: Glasses illustration -->
          <div class="hidden lg:flex justify-center items-center">
            <div class="relative">
              <svg viewBox="0 0 520 260" class="w-[440px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Ambient glow -->
                <ellipse cx="145" cy="130" rx="155" ry="105" fill="rgba(59,130,246,0.06)"/>
                <ellipse cx="375" cy="130" rx="155" ry="105" fill="rgba(59,130,246,0.06)"/>
                <!-- Outer pulse rings -->
                <rect x="10" y="68" width="270" height="124" rx="32" stroke="rgba(251,191,36,0.07)" stroke-width="18" fill="none"/>
                <rect x="240" y="68" width="270" height="124" rx="32" stroke="rgba(251,191,36,0.07)" stroke-width="18" fill="none"/>
                <!-- Main lens frames (rectangular like logo) -->
                <rect x="20" y="78" width="210" height="104" rx="24" stroke="rgba(255,255,255,0.88)" stroke-width="8" fill="rgba(255,255,255,0.03)"/>
                <rect x="250" y="78" width="210" height="104" rx="24" stroke="rgba(255,255,255,0.88)" stroke-width="8" fill="rgba(255,255,255,0.03)"/>
                <!-- Inner dashed detail -->
                <rect x="34" y="90" width="182" height="80" rx="18" stroke="rgba(251,191,36,0.22)" stroke-width="1.5" stroke-dasharray="5 3" fill="none"/>
                <rect x="264" y="90" width="182" height="80" rx="18" stroke="rgba(251,191,36,0.22)" stroke-width="1.5" stroke-dasharray="5 3" fill="none"/>
                <!-- Bridge -->
                <path d="M230,130 C230,118 250,118 250,130" stroke="rgba(255,255,255,0.85)" stroke-width="7" stroke-linecap="round" fill="none"/>
                <!-- Temple arms -->
                <path d="M20,130 C10,130 2,144 0,152" stroke="rgba(255,255,255,0.65)" stroke-width="7" stroke-linecap="round"/>
                <path d="M460,130 C470,130 478,144 480,152" stroke="rgba(255,255,255,0.65)" stroke-width="7" stroke-linecap="round"/>
                <!-- Lens reflections -->
                <path d="M44,94 C60,86 90,84 105,90" stroke="rgba(255,255,255,0.28)" stroke-width="3" stroke-linecap="round"/>
                <path d="M274,94 C290,86 320,84 335,90" stroke="rgba(255,255,255,0.28)" stroke-width="3" stroke-linecap="round"/>
                <!-- Sparkle stars -->
                <text x="125" y="62" text-anchor="middle" font-size="20" fill="rgba(251,191,36,0.85)">✦</text>
                <text x="395" y="62" text-anchor="middle" font-size="16" fill="rgba(251,191,36,0.65)">✦</text>
                <text x="468" y="82" text-anchor="middle" font-size="12" fill="rgba(251,191,36,0.5)">✦</text>
                <text x="32" y="80" text-anchor="middle" font-size="11" fill="rgba(251,191,36,0.45)">✦</text>
                <text x="258" y="52" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.35)">✦</text>
              </svg>

              <!-- Floating badges -->
              <div class="absolute -top-6 -right-8 bg-white rounded-2xl px-4 py-3 shadow-2xl">
                <p class="text-xs text-gray-400 font-medium">Customer Rating</p>
                <p class="font-bold text-slate-800 text-sm flex items-center gap-1">
                  <span class="text-amber-400 text-base">★★★★★</span>
                </p>
              </div>
              <div class="absolute -bottom-6 -left-8 bg-white rounded-2xl px-4 py-3 shadow-2xl">
                <p class="text-xs text-gray-400 font-medium">Express Service</p>
                <p class="font-bold text-slate-800">Ready in <span style="color:#d97706;">24 Hours</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" class="fill-white w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>

    <!-- ===== FEATURES STRIP ===== -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          @for (f of features; track f.title) {
            <div class="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all group cursor-default">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-200/40"
                   style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                <i [class]="'pi ' + f.icon + ' text-2xl text-white'"></i>
              </div>
              <h3 class="font-bold text-gray-900 text-sm mb-1">{{ f.title }}</h3>
              <p class="text-gray-500 text-xs leading-relaxed">{{ f.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===== FEATURED PRODUCTS ===== -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">Our Collection</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Featured Eyewear</h2>
          <p class="text-gray-500 mt-3 max-w-lg mx-auto">Handpicked frames for every face &amp; style.</p>
        </div>

        @if (facade.featuredProducts().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of facade.featuredProducts(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (p of placeholders; track p.id) {
              <app-product-card [product]="p" />
            }
          </div>
        }

        <div class="text-center mt-10">
          <a routerLink="/products"
             class="inline-flex items-center gap-2 px-8 py-3.5 border-2 rounded-xl font-bold transition-all hover:text-white"
             style="border-color:#0a0f1e; color:#0a0f1e;"
             onmouseover="this.style.background='#0a0f1e'"
             onmouseout="this.style.background='transparent'">
            View All Products <i class="pi pi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== SERVICES ===== -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">What We Offer</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Our Services</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services; track service.title) {
            <div class="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                   style="background: linear-gradient(135deg, #fef3c7, #fde68a);">
                <i [class]="'pi ' + service.icon + ' text-xl'" style="color:#92400e;"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-1">{{ service.title }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed">{{ service.desc }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===== CTA BANNER ===== -->
    <section class="py-20 relative overflow-hidden"
             style="background: linear-gradient(135deg, #06090f 0%, #0a1428 100%);">

      <!-- Sparkle dots -->
      <div class="absolute top-6 left-[10%] w-1.5 h-1.5 rounded-full bg-amber-400 sparkle pointer-events-none"></div>
      <div class="absolute top-12 right-[15%] w-1 h-1 rounded-full bg-amber-300 sparkle sparkle-delay-1 pointer-events-none"></div>
      <div class="absolute bottom-8 left-[30%] w-1 h-1 rounded-full bg-white/60 sparkle sparkle-delay-2 pointer-events-none"></div>
      <div class="absolute bottom-10 right-[25%] w-1.5 h-1.5 rounded-full bg-amber-400 sparkle sparkle-delay-3 pointer-events-none"></div>

      <!-- Gold top accent line -->
      <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);"></div>

      <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Visit Us Today</span>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-5">
          Book Your Eye Check-up
        </h2>
        <p class="text-slate-400 text-lg mb-10">
          Visit us in Gelephu for a free eye check-up, explore our premium collection,<br class="hidden sm:block"/> or get your lenses fitted by our expert team.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="tel:+97517635837"
             class="px-8 py-4 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-amber-900/40"
             style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            <i class="pi pi-phone"></i> Call Now
          </a>
          <a routerLink="/contact"
             class="px-8 py-4 border-2 border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <i class="pi pi-map-marker"></i> Get Directions
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  facade = inject(ProductFacade);

  stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '200+', label: 'Frame Styles' },
    { value: '10+', label: 'Years Experience' },
  ];

  features = [
    { icon: 'pi-eye', title: 'Expert Eye Testing', desc: 'Certified optometrists on site' },
    { icon: 'pi-verified', title: 'Premium Frames', desc: 'Top international brands' },
    { icon: 'pi-tag', title: 'Best Prices', desc: 'Competitive rates guaranteed' },
    { icon: 'pi-bolt', title: 'Same-Day Service', desc: 'Ready in as little as 24hrs' },
  ];

  services = [
    { icon: 'pi-eye', title: 'Eye Examination', desc: 'Comprehensive vision testing with modern equipment by certified optometrists.' },
    { icon: 'pi-star', title: 'Premium Eyeglasses', desc: 'Wide selection of branded frames — from classic to contemporary styles.' },
    { icon: 'pi-sun', title: 'Designer Sunglasses', desc: 'UV-protection sunglasses from top global brands for every lifestyle.' },
    { icon: 'pi-cog', title: 'Lens Replacement', desc: 'Upgrade your existing frames with new high-quality prescription lenses.' },
    { icon: 'pi-bolt', title: 'Express Service', desc: 'Get your glasses ready in as little as 24 hours with our express fitting.' },
    { icon: 'pi-truck', title: 'Home Delivery', desc: 'Convenient delivery across Gelephu and nearby areas in Bhutan.' },
  ];

  placeholders = [
    { id: '1', name: 'Classic Round Frame', price: 2500, category: 'eyeglass' as const, imageUrl: 'https://placehold.co/400x400/f1f5f9/334155?text=Round+Frame', brand: 'Ray-Ban', inStock: true },
    { id: '2', name: 'Aviator Sunglasses', price: 3800, category: 'sunglass' as const, imageUrl: 'https://placehold.co/400x400/fffbeb/92400e?text=Aviator', brand: 'Oakley', inStock: true },
    { id: '3', name: 'Rectangle Frame', price: 1999, category: 'eyeglass' as const, imageUrl: 'https://placehold.co/400x400/f1f5f9/334155?text=Rectangle', brand: 'Titan', inStock: true },
    { id: '4', name: 'Cat Eye Frame', price: 2200, category: 'eyeglass' as const, imageUrl: 'https://placehold.co/400x400/f1f5f9/334155?text=Cat+Eye', brand: 'Vogue', inStock: false },
  ];
}
