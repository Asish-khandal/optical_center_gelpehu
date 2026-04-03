import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="text-gray-300" style="background: #06090f;">

      <!-- Top accent line -->
      <div class="h-px w-full" style="background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

          <!-- Brand -->
          <div>
            <div class="mb-5 rounded-xl overflow-hidden inline-block" style="background:#000;">
              <img src="/optical_center_logo.png" alt="Himalayan Optical Center" class="h-16 w-auto block" style="mix-blend-mode:screen;"/>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
              Your trusted eyewear destination in Gelephu, Bhutan. Premium frames, expert care, crystal-clear vision.
            </p>
            <p class="text-xs text-gray-600 mt-3">Owner: <span class="text-amber-500 font-semibold">Kumar Karki</span></p>
            <div class="flex gap-3 mt-5">
              <a href="https://www.facebook.com/profile.php?id=100062862846381" target="_blank" aria-label="Facebook"
                class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all text-sm">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram"
                class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all text-sm">
                <i class="pi pi-instagram"></i>
              </a>
              <a href="https://wa.me/97517635837" target="_blank" aria-label="WhatsApp"
                class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all text-sm">
                <i class="pi pi-whatsapp"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white font-bold mb-5 text-xs uppercase tracking-widest text-amber-400">Quick Links</h3>
            <ul class="space-y-3">
              @for (link of links; track link.path) {
                <li>
                  <a [routerLink]="link.path"
                    class="text-gray-500 hover:text-amber-400 transition-colors text-sm flex items-center gap-3 group">
                    <span class="w-4 h-px bg-amber-500/30 group-hover:w-6 group-hover:bg-amber-400 transition-all"></span>
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-white font-bold mb-5 text-xs uppercase tracking-widest text-amber-400">Contact</h3>
            <ul class="space-y-4 text-sm text-gray-500">
              <li class="flex items-start gap-3">
                <i class="pi pi-map-marker text-amber-500 mt-0.5 shrink-0"></i>
                <span>Gelephu Town<br>Sarpang District, Bhutan</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="pi pi-phone text-amber-500 shrink-0"></i>
                <a href="tel:+97517635837" class="hover:text-amber-400 transition-colors">+975-17635837</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="pi pi-whatsapp text-amber-500 shrink-0"></i>
                <a href="https://wa.me/97517635837" target="_blank" class="hover:text-amber-400 transition-colors">WhatsApp: +975-17635837</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="pi pi-envelope text-amber-500 shrink-0"></i>
                <a href="mailto:info@himalayanoptical.bt" class="hover:text-amber-400 transition-colors">info&#64;himalayanoptical.bt</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="pi pi-clock text-amber-500 shrink-0"></i>
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>&copy; {{ year }} Himalayan Optical Center, Gelephu, Bhutan. All rights reserved.</p>
          <p>Owner: Kumar Karki</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();

  links = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
}
