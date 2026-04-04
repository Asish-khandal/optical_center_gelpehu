import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `

    <!-- ===== HERO ===== -->
    <section class="max-w-7xl mx-auto px-6 py-24 pt-36">
      <div class="grid md:grid-cols-2 gap-16 items-center">

        <!-- Left: Text -->
        <div class="order-2 md:order-1">
          <span class="inline-block py-1 px-4 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold uppercase tracking-widest mb-6">
            Established 1994
          </span>
          <h2 class="text-5xl md:text-6xl font-black font-headline text-primary leading-tight mb-8">
            Crafting Clarity with <span style="color: #4a6360;">Precision.</span>
          </h2>
          <p class="text-lg text-on-surface-variant leading-relaxed mb-10 max-w-lg">
            For over a decade, Himalayan Optical Center has been the cornerstone of vision health in Gelephu, Bhutan. Founded by <strong class="text-primary">Kumar Karki</strong>, we combine clinical expertise with an editorial eye for eyewear, ensuring you don't just see the world better — you look better seeing it.
          </p>
          <div class="flex gap-4">
            <div class="p-4 bg-surface-container-low rounded-xl">
              <p class="text-3xl font-bold text-primary font-headline">10+</p>
              <p class="text-sm font-label text-on-surface-variant">Years Excellence</p>
            </div>
            <div class="p-4 bg-surface-container-low rounded-xl">
              <p class="text-3xl font-bold text-primary font-headline">500+</p>
              <p class="text-sm font-label text-on-surface-variant">Happy Patients</p>
            </div>
          </div>
        </div>

        <!-- Right: Overlapping images -->
        <div class="order-1 md:order-2 relative">
          <div class="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiinmsDjNf6eNB__DdSIhxpQ-MuzGBvt1nZ4ZU9sw-NPCdSy44JlcGdMG9Y-OS7lqZz8L6kipgwBJqHdTWdYYt7tViHjmxRiKBTFMOxE4CoEMLMYr3sza9Sc_rDXBmIjYnfEaI3WbuPjnP89r2xN-oSf0V3SE0FbKyFjWyn9Q0t7X287PXDfqUdedupzo1iFUmjmbkMzn_YDfM8SyMAqx0fBCd10MXjmB5AaCWPslbGsZllpq2_Rfye5zqAUK6Rtsn0OtqU7IuH-zj"
              alt="Premium eyewear display"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -left-6 w-2/3 aspect-square rounded-2xl overflow-hidden border-8 border-surface shadow-xl hidden md:block">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Q-3YJaHq2Yge509nMP6KloGA_Z_r_1lu6cOKcwHH1QFjvI5mA3RbiEZbaTfOdvR5SYVeqjaYRBYN-emMR_DVxXSrE-5ssPlyp3wAAhQ5djMakJL5-rzt7kKu86bzv5aSDckCjQFZWVuR6BFSs0rckm7dDyvaRJJS2B9uv0Im53KRdSer-qhaqTN0Eqo3M0WP5_9Pl266QNKaMVc02BSXSN0PElq5bFiQy7L9zuqtdXV0phvHxbFr5IzuMw1uZa0nJqNaP6wl5hv1"
              alt="Optometrist at work"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>

    <!-- ===== MISSION & VISION ===== -->
    <section class="bg-surface-container-low py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="bg-surface-container-lowest p-12 rounded-2xl shadow-sm border-l-4 border-primary">
            <span class="material-symbols-outlined text-primary mb-6" style="font-size:40px;">lightbulb</span>
            <h3 class="text-2xl font-bold font-headline text-primary mb-4">Our Mission</h3>
            <p class="text-on-surface-variant leading-relaxed">
              To provide uncompromising vision care by merging state-of-the-art diagnostic technology with personalized lens craftsmanship, ensuring every patient achieves their highest visual potential through clarity and comfort.
            </p>
          </div>
          <div class="bg-surface-container-lowest p-12 rounded-2xl shadow-sm" style="border-left: 4px solid #4a6360;">
            <span class="material-symbols-outlined mb-6" style="font-size:40px; color:#4a6360;">visibility</span>
            <h3 class="text-2xl font-bold font-headline text-primary mb-4">Our Vision</h3>
            <p class="text-on-surface-variant leading-relaxed">
              To be recognized as the premier destination for optical excellence in Bhutan, where innovative eye health solutions meet a curated boutique experience, defining the future of eye care in the region.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== OUR STORY ===== -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-16">
        <!-- Left: story text + founder -->
        <div class="md:w-1/2">
          <h2 class="text-4xl font-bold font-headline text-primary mb-8 tracking-tight">The Heritage of Himalayan Optical</h2>
          <div class="space-y-6 text-on-surface-variant leading-relaxed">
            <p>Our journey began with a simple belief: eye care should be as individual as the person receiving it. Founded in the heart of Gelephu, Himalayan Optical Center was built on the foundation of clinical rigor and family values.</p>
            <p>We don't just "sell glasses." We perform comprehensive diagnostics to understand the unique landscape of your vision. From pediatric screenings to eye health for all ages, our practitioners are dedicated to the lifelong journey of your eyes.</p>
            <p>Every frame in our collection is hand-selected. We look for durability, material innovation, and timeless design. Whether it's Italian-crafted acetate or aerospace-grade titanium, our inventory reflects our commitment to quality that lasts.</p>
          </div>
          <!-- Founder -->
          <div class="mt-12 flex items-center gap-4">
            <img
              src="/kumar karki.png"
              alt="Kumar Karki - Founder"
              class="w-16 h-16 rounded-full object-cover object-top grayscale"
            />
            <div>
              <p class="font-bold text-primary">Kumar Karki</p>
              <p class="text-sm text-on-surface-variant">Founder &amp; Owner</p>
            </div>
          </div>
          <!-- Social links -->
          <div class="mt-6 flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=100062862846381" target="_blank"
               class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-all"
               style="background: #1877f2;">
              <i class="pi pi-facebook"></i> Facebook
            </a>
            <a href="https://wa.me/97517635837" target="_blank"
               class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-all bg-green-500 hover:bg-green-600">
              <i class="pi pi-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>

        <!-- Right: bento photo grid -->
        <div class="md:w-1/2 grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="h-64 rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY7BxjDulM2WBSPiNPxBS5EQAeXa0izSfkqePAAQacL5srtL95F7j7q6fQIHMgtqzgtX__0bFvZhXl9klNQMQ05XS5nmlVdrHbjfgJ2j1-fSQ34b6-uYGLTidAOC8Eda3PcH6x1Teeo-f86a5e5QudH6WqKHd4Ed8hygOL4PdQzlKv3_1oo-e_9F3zQVii4fjN7uMPYmFXmzeasAzNbG2Ro6Vo9ASzgi_DwY_4eec699IziWHloaHZKlcjFF7QF6aDBmJzrYYq2XcD"
                alt="Eyewear collection"
              />
            </div>
            <div class="h-48 rounded-xl bg-primary-container p-8 flex flex-col justify-end">
              <p class="text-on-primary-container font-headline text-xl font-bold">Innovation at Heart</p>
            </div>
          </div>
          <div class="space-y-4 pt-8">
            <div class="h-48 rounded-xl bg-secondary-container p-8 flex flex-col justify-end">
              <p class="text-on-secondary-container font-headline text-xl font-bold">Clinical Focus</p>
            </div>
            <div class="h-64 rounded-xl overflow-hidden">
              <img
                class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsAEmUZiFme0XL_yueBvgx1NGcVXO6-7zHKkhssYVnQlkef63DYPvM4geDq5yU1539U9yIah-h710Lqtl-eGMXGjyNTjqR3g3hl_r2_K1pgs2lfhdQblC6aKVbHDVe0gkzuv7ippXCfSmTPyupHyrYXtunWj3FNoxAsTE134n2Xm04PIttnLSGfVbkDQu9RcutzW15Li0biQzw_uLubSZF0fy10YampKG_sGbL9FtXz3PIx2DzEEcU0_K07WSN79CVegbMNREt3iGO"
                alt="Optical store interior"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="max-w-7xl mx-auto px-6 mb-24">
      <div class="hero-gradient rounded-3xl p-12 md:p-20 text-center text-on-primary relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-4xl md:text-5xl font-black font-headline mb-6">Ready for a Clearer Perspective?</h2>
          <p class="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Experience our premium eye care service and discover a world of clarity with our expert optometrists in Gelephu, Bhutan.
          </p>
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <a routerLink="/contact" class="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-colors">Book an Eye Exam</a>
            <a routerLink="/products" class="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">Explore Collections</a>
          </div>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" style="background: rgba(0,75,73,0.2);"></div>
      </div>
    </section>
  `,
})
export class AboutComponent {}
