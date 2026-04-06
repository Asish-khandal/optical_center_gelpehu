import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  styles: [`
    .whatsapp-btn {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 999;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 9999px;
      background: #25d366;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.45);
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
    }
    .whatsapp-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(37,211,102,0.55);
    }
    .whatsapp-btn i { font-size: 1.5rem; }
  `],
  template: `
    @if (!isAdmin()) {
      <app-navbar />
    }
    <main>
      <router-outlet />
    </main>
    @if (!isAdmin()) {
      <app-footer />
      <!-- WhatsApp Floating Button -->
      <a
        href="https://wa.me/97517635837?text=Hello%20Himalayan%20Optical%20Center%2C%20I%20would%20like%20to%20enquire%20about%20your%20eyewear."
        target="_blank"
        rel="noopener"
        class="whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <i class="pi pi-whatsapp"></i>
      </a>
    }
  `,
})
export class App {
  private router = inject(Router);
  private url = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url)
    )
  );
  isAdmin = computed(() => (this.url() ?? '').startsWith('/admin'));
}
