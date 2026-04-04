import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductFacade } from '../../core/facades/product.facade';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `

    <!-- ===== HERO ===== -->
    <section class="relative min-h-[870px] flex items-center overflow-hidden bg-surface-container-low">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

        <!-- Left: Text -->
        <div class="lg:col-span-6 z-10 py-20 lg:py-0">
          <span class="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary bg-secondary-container rounded-full uppercase font-label">
            Visionary Excellence
          </span>
          <h1 class="text-5xl md:text-7xl font-extrabold text-primary font-headline leading-[1.1] mb-6 tracking-tight">
            Himalayan Optical <br/>
            <span style="color: #004b49; opacity: 0.7;">Center</span>
          </h1>
          <p class="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-lg">
            Clear Vision, Better Life. Discover artisanal frames curated for clinical precision and unparalleled style.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="tel:+97517635837"
               class="px-8 py-4 text-on-primary rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all hero-gradient">
              <span class="material-symbols-outlined" style="font-size:18px;">call</span>
              Call Now
            </a>
            <a routerLink="/products"
               class="px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-surface-container-low transition-all">
              View Products
            </a>
          </div>
        </div>

        <!-- Right: Hero image -->
        <div class="lg:col-span-6 relative">
          <div class="absolute -top-20 -right-20 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl transform rotate-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlUV6OLiCaOD-o3_X8YZXAN4vIhoCSFZK-1bjJr3DSMZz6yqWB7-p2CPELDwlqE_S9VSML3KVg9JXy0enz8sfo765QWAG73AR3O6trIVQ4KsZJ6OTfMPw8gDpeAxg_So6TGdm7HKOwRngur753CxqLLGQYjmX3AchMpA3FelEAw2t0ZddwDhSA2J1gULU__U-MbO9emvUo_ELBBMNfDUU21eqFDKSTLZjDKXG7uTd01jFdS5v1j_xzUUtRmzV8QPbtb7YpyB9vI1CI"
              alt="Elegant eyewear at Himalayan Optical Center"
              class="w-full object-cover"
              style="height: 600px;"
            />
          </div>
          <!-- Floating quality card -->
          <div class="absolute -bottom-8 -left-8 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <span class="font-bold text-primary">Certified Quality</span>
            </div>
            <p class="text-sm text-slate-500">Premium lenses from Zeiss and Essilor for ultimate clarity.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== ARTISANAL FRAMES (BENTO GRID) ===== -->
    <section class="py-24 px-6 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-primary font-headline mb-4">Artisanal Frames</h2>
          <p class="text-lg text-on-surface-variant">Hand-selected collections that define modern sophistication and optical excellence.</p>
        </div>
        <a routerLink="/products"
           class="text-primary font-bold flex items-center gap-2 group shrink-0">
          Explore Collection
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform" style="font-size:18px;">arrow_forward</span>
        </a>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <!-- Large: Titanium Series (col-span-2 row-span-2) -->
        <div class="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 flex flex-col justify-between h-[600px]">
          <div class="relative z-10">
            <span class="text-sm font-bold text-on-primary-container tracking-widest uppercase">New Arrival</span>
            <h3 class="text-3xl font-bold mt-2 text-white drop-shadow">Titanium Series</h3>
          </div>
          <img
            class="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEYd2y4CWL7jcGprjBsjZBHF0YVxF2RbNiFTOW4JUVwKJ_Wq0MwrzGp2IMGWV0tu2UUmgVkNbz3W7AM6WleurSWJmhAxbCflDghzbplrWqOzhgq8RZtHOTQxQcRjvOQACeU8Xi_zp7vKLCBWgMrxcfZXMKp2lV3rcDxU_zSd0K18swlX_W7MgPH8Ik1nwlQJPvNfQ7UDT71VrUxGzGBsLKaC682x8ttvN81Ue1YWmpBJ8JyqjbjUY68vhdaUvgdwRPrbGIpGHAGfWz"
            alt="Titanium Series eyewear"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent -z-10"></div>
          <div class="relative z-10 mt-auto">
            <a routerLink="/products"
               class="inline-block px-6 py-3 bg-white/90 backdrop-blur text-primary rounded-lg font-bold shadow-lg hover:bg-white transition-colors">
              Shop Now
            </a>
          </div>
        </div>

        <!-- Classic Aviators -->
        <div class="md:col-span-2 group relative overflow-hidden rounded-2xl bg-surface-container-low h-[288px]">
          <img
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPuQa_J7PMuEaGGkuLd37jcshWvO9XDGWyWU2NQzNudFaPoHZnYLnXPCSeAkOd01FLDAnSijnBrMNBNoTFbGtxaWrtGqLFbAmzeBW8YatPbFBcWZ2M9nkqbi_wF7BbRkJOu3sltW-KstLpCSVOLIDrpdDdpMWluMG34lbTJoeX762DmWhVYZnpS5m4Wnj9Wjp2pYSxI5HWZ2jHq8CioYy8Ky35L44q9KbmLoCH4XzpvX_7sqk21vSWAw8Yy1O8-u0qADKIe8DJtt3n"
            alt="Classic Aviators"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h3 class="text-white text-xl font-bold">Classic Aviators</h3>
            <p class="text-white/80 text-sm">Timeless style, modern protection.</p>
          </div>
        </div>

        <!-- The Minimalist -->
        <div class="group relative overflow-hidden rounded-2xl bg-surface-container-low h-[288px]">
          <img
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvsxj1UvPAuIii1c2XJPb708nQOOYOCtEMy4x4OQhcvTh4slg76fVm77BCgiQb5GDa-qNGezlHFU35DSXH3dpWcbKud5fns1FySizx18kUHDB0YSbXXrZBRVwL0WkJxU4agO5snPVhPkWiFRWWMR1NobjzYrrbwkzU0MYtGvZo4aFTogTy1CKK6DwTGxOfWYYT2806DAXVneEKDEuBRrEG9hFr3fqr9ow83k7YwgqyHtmOXtoYPn04Hiy0cDLSKbb69K8EeKHWX7Yc"
            alt="The Minimalist"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 class="text-white text-lg font-bold">The Minimalist</h3>
          </div>
        </div>

        <!-- Eco-Craft -->
        <div class="group relative overflow-hidden rounded-2xl bg-surface-container-low h-[288px]">
          <img
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcCjZE1E4jsb4MYzZK4yAiDw9xIyoHymm3VyE80ex9kpll04AonqFLxx7fnLGkCwu52nNbgJvXbu6W_LvMgsrRxmVQEa3bzDKHwtlJZW9-Pz-iH1W-nYmPAvVvT_QtDRkGiymLdN7RZOKiUmSzhnc3PlfyrTyl0UJ4Hunn556s-bX_spwIkoyWatakiwuJ-1ClFL7OfnUodrBBPjZQMxuO97fZ5Gy8GtrWG7HmKKg0FbB_wi-WEiN7XSB4NshngkSiCDdQ531EChjR"
            alt="Eco-Craft"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 class="text-white text-lg font-bold">Eco-Craft</h3>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== PRECISION SERVICES ===== -->
    <section class="bg-surface-container-low py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-primary font-headline mb-4">Precision Services</h2>
          <p class="text-on-surface-variant max-w-xl mx-auto">Comprehensive eye care powered by advanced diagnostic technology and clinical expertise.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (service of services; track service.title) {
            <div class="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:shadow-md transition-all group">
              <div class="w-16 h-16 bg-secondary-container text-primary rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span class="material-symbols-outlined text-3xl">{{ service.icon }}</span>
              </div>
              <h3 class="text-2xl font-bold text-primary mb-4">{{ service.title }}</h3>
              <p class="text-on-surface-variant leading-relaxed">{{ service.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS ===== -->
    <section class="py-24 px-6 overflow-hidden">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <!-- Left: heading + arrows -->
        <div class="lg:col-span-4">
          <h2 class="text-4xl font-bold text-primary font-headline mb-6 leading-tight">What Our <br/>Community Says</h2>
          <div class="flex gap-4">
            <button
              (click)="prevTestimonial()"
              class="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              (click)="nextTestimonial()"
              class="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Right: testimonial cards -->
        <div class="lg:col-span-8">
          <div class="flex gap-8 overflow-hidden">
            <!-- Primary card -->
            <div class="min-w-[400px] bg-white p-10 rounded-3xl shadow-xl shadow-slate-900/5">
              <div class="flex gap-1 text-yellow-500 mb-6">
                @for (s of [1,2,3,4,5]; track s) {
                  <span style="font-size:18px;">★</span>
                }
              </div>
              <p class="text-xl italic text-on-surface mb-8">"{{ testimonials[activeTestimonial()].quote }}"</p>
              <div class="flex items-center gap-4">
                <img
                  [src]="testimonials[activeTestimonial()].avatar"
                  [alt]="testimonials[activeTestimonial()].name"
                  class="w-12 h-12 rounded-full object-cover bg-slate-200"
                />
                <div>
                  <h4 class="font-bold text-primary">{{ testimonials[activeTestimonial()].name }}</h4>
                  <p class="text-sm text-slate-500 font-label">{{ testimonials[activeTestimonial()].role }}</p>
                </div>
              </div>
            </div>
            <!-- Secondary blurred card -->
            <div class="min-w-[400px] bg-white/50 p-10 rounded-3xl opacity-50 blur-[1px]">
              <p class="text-xl italic text-on-surface mb-8">"{{ testimonials[(activeTestimonial() + 1) % testimonials.length].quote }}"</p>
              <h4 class="font-bold text-primary">{{ testimonials[(activeTestimonial() + 1) % testimonials.length].name }}</h4>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ===== CTA SECTION ===== -->
    <section class="max-w-7xl mx-auto px-6 mb-24">
      <div class="hero-gradient rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 pointer-events-none"></div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">Experience Perfect Clarity</h2>
        <p class="text-white/80 text-xl mb-12 max-w-2xl mx-auto relative z-10">
          Book your comprehensive eye exam today with our leading ophthalmologists.
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-6 relative z-10">
          <a routerLink="/contact"
             class="px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Schedule Appointment
          </a>
          <a routerLink="/contact"
             class="px-10 py-4 border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  facade = inject(ProductFacade);
  activeTestimonial = signal(0);

  services = [
    {
      icon: 'medical_services',
      title: 'Full Eye Exams',
      desc: 'Advanced screenings for early detection of eye diseases and precise vision correction.',
    },
    {
      icon: 'contacts_product',
      title: 'Contact Lens Fitting',
      desc: 'Personalized fitting sessions for all types of contacts, including multifocal and toric lenses.',
    },
    {
      icon: 'build',
      title: 'Expert Repair',
      desc: 'Precision adjustments and structural repairs to keep your eyewear performing perfectly.',
    },
  ];

  testimonials = [
    {
      quote: 'The attention to detail at Himalayan Optical is unmatched. My new titanium frames are incredibly light and the prescription is perfect.',
      name: 'Dr. Rajesh Sharma',
      role: 'Regular Customer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnLnIIkt7ubFwqo2j1QkfJmXvu8UR4q-v3VTTADQfBJg-Q4-Dpa0bjAqCsDT6q2adT0cmmcha2Lt-7BDNwRCSWBsrbSTHthBcTWcUfaIf4sUVeP4LkbQLk0oIhKNnuP6ZU1kXP5IiL0lxdO3uyNUoYSTL-_vODvn6CY7Ft9NAoIvmPVqK62U5-d6rvtrYFyZyqj_JLTTZb0__pCHkVYkXEFEd7PfYY6WdP7DCCofZsQjIoadNknhadSsDkJmgpQHsrFid3VkF-ieyM',
    },
    {
      quote: 'Amazing selection of luxury brands. Finally found the specific frames I\'ve been looking for months.',
      name: 'Priya Tamang',
      role: 'Regular Customer',
      avatar: 'https://i.pravatar.cc/48?img=45',
    },
    {
      quote: 'Kumar personally helped me find the perfect frames for my face shape. Outstanding service and great prices.',
      name: 'Tenzin Dorji',
      role: 'Regular Customer',
      avatar: 'https://i.pravatar.cc/48?img=17',
    },
  ];

  prevTestimonial() {
    this.activeTestimonial.update(v => (v - 1 + this.testimonials.length) % this.testimonials.length);
  }

  nextTestimonial() {
    this.activeTestimonial.update(v => (v + 1) % this.testimonials.length);
  }
}
