import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <div class="pt-28 pb-16 relative overflow-hidden"
         style="background: linear-gradient(135deg, #06090f 0%, #0a1428 100%);">
      <div class="sparkle absolute w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none" style="right:12%;top:30%;"></div>
      <div class="sparkle sparkle-delay-2 absolute w-1 h-1 rounded-full bg-white pointer-events-none" style="left:25%;bottom:25%;"></div>
      <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Our Story</span>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-2">About Us</h1>
        <p class="text-slate-400 text-lg">Our mission, values &amp; the people behind the frames</p>
      </div>
    </div>

    <!-- Story section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Visual -->
          <div class="flex justify-center">
            <div class="relative">
              <div class="w-80 h-80 rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-200/50 border border-gray-100 overflow-hidden"
                   style="background: linear-gradient(135deg, #f8fafc, #eff6ff);">
                <div class="rounded-xl overflow-hidden inline-block" style="background:#000;">
                  <img src="/optical_center_logo.png" alt="Himalayan Optical Center" class="w-64 h-auto object-contain block" style="mix-blend-mode:screen;"/>
                </div>
              </div>
              <div class="absolute -bottom-5 -right-5 text-white rounded-2xl px-6 py-4 shadow-xl"
                   style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                <p class="text-3xl font-extrabold">10+</p>
                <p class="text-amber-100 text-sm">Years of Service</p>
              </div>
              <div class="absolute -top-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100">
                <p class="text-xs text-gray-400 font-medium">Customers Served</p>
                <p class="font-bold text-slate-800">500+ Happy Clients</p>
              </div>
            </div>
          </div>

          <!-- Text -->
          <div>
            <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">Our Story</span>
            <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Clarity &amp; Style,<br>Since Day One
            </h2>
            <p class="text-gray-600 leading-relaxed mb-5">
              Himalayan Optical Center was founded by <strong>Kumar Karki</strong> with a simple goal: to make quality eyewear accessible to everyone
              in Gelephu, Bhutan. Nestled in the heart of Gelephu Town, we've been serving families, students, and professionals
              with precision eyecare and the finest frames.
            </p>
            <p class="text-gray-600 leading-relaxed mb-8">
              Our optometrists use modern equipment for accurate prescriptions, while our wide collection of frames
              ensures you find the perfect fit — whether you prefer classic or contemporary styles.
            </p>
            <a routerLink="/contact"
               class="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-amber-200"
               style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <i class="pi pi-map-marker"></i> Find Us
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission / Vision -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">What Drives Us</span>
          <h2 class="font-display text-3xl font-bold text-gray-900 mt-2">Mission &amp; Vision</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (card of mvCards; track card.title) {
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-100 transition-all">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-amber-200/40"
                   style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                <i [class]="'pi ' + card.icon + ' text-2xl text-white'"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">{{ card.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ card.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Meet the Owner -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">The Person Behind It</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Meet the Owner</h2>
        </div>
        <div class="flex flex-col lg:flex-row items-center gap-12 max-w-4xl mx-auto">
          <!-- Photo -->
          <div class="shrink-0 relative">
            <div class="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border-4 border-white"
                 style="outline: 3px solid #d97706; outline-offset: 4px;">
              <img src="/kumar karki.png" alt="Kumar Karki - Owner" class="w-full h-full object-cover object-top"/>
            </div>
            <!-- Gold badge -->
            <div class="absolute -bottom-4 -right-4 text-white rounded-2xl px-4 py-2 shadow-xl text-center"
                 style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <p class="text-xs font-bold uppercase tracking-wide">Founder &amp;</p>
              <p class="text-xs font-bold uppercase tracking-wide">Optometrist</p>
            </div>
          </div>
          <!-- Info -->
          <div>
            <h3 class="font-display text-3xl font-bold text-gray-900 mb-1">Kumar Karki</h3>
            <p class="text-sm font-bold uppercase tracking-widest mb-4" style="color:#d97706;">Founder &amp; Owner — Himalayan Optical Center</p>
            <p class="text-gray-600 leading-relaxed mb-5">
              With over a decade of experience in eyecare and optical services, Kumar Karki founded Himalayan Optical Center with a vision to bring affordable, premium-quality eyewear to the people of Gelephu, Bhutan.
            </p>
            <p class="text-gray-600 leading-relaxed mb-6">
              Known for his dedication to customer satisfaction, Kumar personally ensures every client receives the right prescription and the perfect frame to match their lifestyle.
            </p>
            <div class="flex gap-3">
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
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold uppercase tracking-widest" style="color:#d97706;">Core Values</span>
          <h2 class="font-display text-3xl font-bold text-gray-900 mt-2">What We Stand For</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (v of values; track v.label) {
            <div class="text-center p-7 rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all group">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform"
                   style="background: linear-gradient(135deg, #fef3c7, #fde68a);">
                {{ v.emoji }}
              </div>
              <h3 class="font-bold text-gray-900 mb-2">{{ v.label }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ v.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 text-center relative overflow-hidden"
             style="background: linear-gradient(135deg, #06090f 0%, #0a1428 100%);">
      <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent, #d97706, transparent);"></div>
      <div class="sparkle absolute w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none" style="left:15%;top:30%;"></div>
      <div class="sparkle sparkle-delay-2 absolute w-1 h-1 rounded-full bg-white/60 pointer-events-none" style="right:20%;bottom:30%;"></div>
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="font-display text-3xl font-bold text-white mb-4">Ready to See Clearly?</h2>
        <p class="text-slate-400 mb-8">Book a free eye check-up or browse our premium collection today.</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <a routerLink="/products"
             class="px-8 py-3.5 text-white rounded-xl font-bold hover:opacity-90 transition-all"
             style="background: linear-gradient(135deg, #f59e0b, #d97706);">
            Browse Products
          </a>
          <a routerLink="/contact"
             class="px-8 py-3.5 border-2 border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  mvCards = [
    {
      icon: 'pi-bullseye',
      title: 'Our Mission',
      body: 'To provide every Nepali with access to high-quality, affordable eyewear and professional vision care — because clear sight is a right, not a privilege.',
    },
    {
      icon: 'pi-eye',
      title: 'Our Vision',
      body: 'To become the most trusted optical brand in Bhutan — known for precision, style, and exceptional customer service across Gelephu and beyond.',
    },
  ];

  values = [
    { emoji: '💎', label: 'Quality', desc: 'Only the best frames and lenses make it to our shelves.' },
    { emoji: '🤝', label: 'Trust', desc: 'Honest advice, transparent pricing, no hidden costs.' },
    { emoji: '❤️', label: 'Care', desc: 'We treat every customer like family.' },
    { emoji: '🚀', label: 'Innovation', desc: 'Embracing modern tech for better vision solutions.' },
  ];
}
