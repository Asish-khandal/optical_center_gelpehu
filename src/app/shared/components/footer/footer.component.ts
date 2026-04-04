import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <footer class="bg-slate-50 w-full rounded-t-xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl">visibility</span>
            <h3 class="text-lg font-bold text-primary font-headline">Himalayan Optical</h3>
          </div>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">
            Guiding clarity for over 25 years. We combine heritage precision with modern aesthetics.
          </p>
          <div class="flex gap-3">
            <a href="https://www.facebook.com/profile.php?id=100062862846381" target="_blank" aria-label="Facebook"
               class="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors">
              <i class="pi pi-facebook text-sm"></i>
            </a>
            <a href="#" aria-label="Instagram"
               class="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors">
              <i class="pi pi-instagram text-sm"></i>
            </a>
            <a href="#" aria-label="Twitter"
               class="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-secondary-container transition-colors">
              <i class="pi pi-twitter text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Collections -->
        <div class="flex flex-col gap-3">
          <h4 class="font-headline font-bold text-primary mb-2 text-sm uppercase tracking-widest">Collections</h4>
          <a [routerLink]="'/products'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Men's Frames</a>
          <a [routerLink]="'/products'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Women's Frames</a>
          <a [routerLink]="'/products'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Eye Care Guide</a>
        </div>

        <!-- Information -->
        <div class="flex flex-col gap-3">
          <h4 class="font-headline font-bold text-primary mb-2 text-sm uppercase tracking-widest">Information</h4>
          <a [routerLink]="'/about'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Our Story</a>
          <a [routerLink]="'/contact'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Find Us</a>
          <a [routerLink]="'/'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Privacy Policy</a>
          <a [routerLink]="'/'" class="text-slate-500 hover:text-primary hover:underline underline-offset-4 text-sm transition-colors">Terms of Service</a>
        </div>

        <!-- Newsletter -->
        <div class="flex flex-col gap-3">
          <h4 class="font-headline font-bold text-primary mb-2 text-sm uppercase tracking-widest">Newsletter</h4>
          <p class="text-slate-500 text-sm leading-relaxed">Stay updated with our latest collections and eye care tips.</p>
          <div class="flex gap-2">
            <input
              type="email"
              [(ngModel)]="emailInput"
              placeholder="Email"
              class="bg-white border-none rounded-lg text-sm w-full focus:ring-1 focus:ring-primary px-4 py-2 outline-none"
            />
            <button
              (click)="subscribeEmail()"
              class="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-all"
              aria-label="Subscribe">
              <span class="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
          @if (subscribed()) {
            <p class="text-emerald-600 text-xs">Thank you for subscribing!</p>
          }
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-8 py-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p class="text-xs text-slate-400">&copy; {{ year }} Himalayan Optical Center. All rights reserved.</p>
        <p class="text-xs text-slate-400 flex items-center gap-1">
          Designed with <span style="color: #e25555;">♥</span> in Gelephu, Bhutan
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
  emailInput = '';
  subscribed = signal(false);

  subscribeEmail() {
    if (this.emailInput.trim()) {
      this.subscribed.set(true);
      this.emailInput = '';
      setTimeout(() => this.subscribed.set(false), 4000);
    }
  }
}
