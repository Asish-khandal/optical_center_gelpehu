import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [ngClass]="scrolled() ? 'shadow-xl shadow-black/30' : ''"
      [style.background]="scrolled() ? 'rgba(6,9,15,0.97)' : 'transparent'"
      style="backdrop-filter: blur(12px);"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[72px]">

          <!-- Logo -->
          <a routerLink="/" class="flex items-center shrink-0">
            <img
              src="/image-removebg-preview.png"
              alt="Himalayan Optical Center"
              class="h-12 w-auto"
            />
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-amber-400 font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="px-4 py-2 text-white/75 hover:text-white text-sm font-medium transition-all relative group"
              >
                {{ link.label }}
                <span class="absolute bottom-0.5 left-4 right-4 h-0.5 bg-amber-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
            }
            <a
              href="tel:+97517635837"
              class="ml-3 px-5 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2 active:scale-95"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);"
            >
              <i class="pi pi-phone text-xs"></i> Call Us
            </a>
          </div>

          <!-- Mobile burger -->
          <button
            class="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
            (click)="toggleMenu()"
            aria-label="Toggle menu"
          >
            <i class="pi text-xl" [ngClass]="menuOpen() ? 'pi-times' : 'pi-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="md:hidden border-t border-white/10" style="background: rgba(6,9,15,0.98);">
          <div class="px-4 py-4 flex flex-col gap-1">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="bg-white/10 text-amber-400 font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                (click)="menuOpen.set(false)"
                class="px-4 py-3.5 rounded-xl text-white/75 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
              >{{ link.label }}</a>
            }
            <a
              href="tel:+97517635837"
              class="mt-2 px-5 py-3.5 text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);"
            >
              <i class="pi pi-phone"></i> Call Us
            </a>
          </div>
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
