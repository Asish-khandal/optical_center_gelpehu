import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 w-full z-50 glass-nav shadow-sm">
      <div class="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        <!-- Logo (long press → admin) -->
        <a routerLink="/" class="flex items-center gap-2 select-none"
          (mousedown)="startLongPress()" (mouseup)="cancelLongPress()" (mouseleave)="cancelLongPress()"
          (touchstart)="startLongPress()" (touchend)="cancelLongPress()" (touchcancel)="cancelLongPress()">
          <span class="text-xl font-bold text-primary font-headline tracking-tight">Himalayan Optical Center</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          @for (link of navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="text-primary font-semibold border-b-2 border-primary"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="text-slate-600 hover:text-primary transition-colors font-headline pb-1"
            >
              {{ link.label }}
            </a>
          }
        </div>

        <!-- Right actions -->
        <div class="hidden md:flex items-center gap-4">
          <a
            routerLink="/appointment"
            class="bg-primary text-on-primary px-6 py-2 rounded-lg font-headline font-semibold text-sm hover:shadow-xl transition-all active:scale-95"
          >
            Book Appointment
          </a>
        </div>

        <!-- Mobile burger -->
        <button
          class="md:hidden p-2.5 rounded-xl text-slate-600 hover:bg-surface-container-low transition-colors"
          (click)="toggleMenu()"
          aria-label="Toggle menu"
        >
          <span class="material-symbols-outlined text-2xl">{{ menuOpen() ? 'close' : 'menu' }}</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="md:hidden border-t border-outline-variant/20 bg-white">
          <div class="px-4 py-4 flex flex-col gap-1">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="bg-surface-container-low text-primary font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                (click)="menuOpen.set(false)"
                class="px-4 py-3.5 rounded-xl text-slate-600 hover:text-primary hover:bg-surface-container-low transition-all font-headline text-sm"
              >{{ link.label }}</a>
            }
            <a
              routerLink="/appointment"
              (click)="menuOpen.set(false)"
              class="mt-2 px-5 py-3.5 bg-primary text-on-primary rounded-xl font-headline font-bold text-center flex items-center justify-center transition-all"
            >
              Book Appointment
            </a>
          </div>
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent {
  private router = inject(Router);
  menuOpen = signal(false);
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop Frames', path: '/products' },
    { label: 'Eye Exams', path: '/contact' },
    { label: 'Our Story', path: '/about' },
  ];

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  startLongPress() {
    this.longPressTimer = setTimeout(() => {
      this.router.navigate(['/admin']);
    }, 800);
  }

  cancelLongPress() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
}
