import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <main class="pt-24 min-h-screen">
      <section class="max-w-7xl mx-auto px-6 py-12">

        <!-- Header -->
        <div class="mb-16">
          <h1 class="text-5xl md:text-6xl font-headline font-extrabold text-primary tracking-tight mb-4">Get in touch</h1>
          <p class="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Experience precision and clarity. Whether you're looking for a prescription update or the perfect frame, our team in Gelephu, Bhutan is here to assist.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <!-- Left: Contact info + map -->
          <div class="space-y-12">
            <div class="space-y-4">

              <!-- Visit -->
              <div class="flex items-start gap-6 p-6 rounded-xl bg-surface-container-lowest">
                <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 class="font-headline font-bold text-xl mb-1 text-primary">Visit Our Boutique</h3>
                  <p class="text-on-surface-variant leading-relaxed">Gelephu Town, Sarpang District<br/>Bhutan</p>
                </div>
              </div>

              <!-- Call -->
              <div class="flex items-start gap-6 p-6 rounded-xl bg-surface-container-lowest">
                <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h3 class="font-headline font-bold text-xl mb-1 text-primary">Call Assistance</h3>
                  <p class="text-on-surface-variant leading-relaxed">
                    <a href="tel:+97517635837" class="hover:text-primary transition-colors">+975-17635837</a><br/>
                    Mon – Sat, 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-6 p-6 rounded-xl bg-surface-container-lowest">
                <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 class="font-headline font-bold text-xl mb-1 text-primary">Digital Inquiry</h3>
                  <p class="text-on-surface-variant leading-relaxed">
                    <a href="mailto:info@himalayanoptical.bt" class="hover:text-primary transition-colors">info@himalayanoptical.bt</a>
                  </p>
                </div>
              </div>

              <!-- WhatsApp -->
              <a href="https://wa.me/97517635837" target="_blank"
                 class="flex items-center gap-3 w-full px-6 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors justify-center shadow-md">
                <i class="pi pi-whatsapp text-xl"></i> Chat on WhatsApp
              </a>
            </div>

            <!-- Map -->
            <div class="rounded-2xl overflow-hidden aspect-video relative bg-surface-container-high">
              <iframe
                src="https://maps.google.com/maps?q=26.8672272,90.4866563&z=17&output=embed"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Store location"
              ></iframe>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-sm">
            <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" novalidate class="space-y-6">

              <!-- Success -->
              @if (submitted()) {
                <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <span class="material-symbols-outlined text-emerald-600">check_circle</span>
                  <div>
                    <p class="text-emerald-800 font-semibold">Message Sent!</p>
                    <p class="text-emerald-600 text-sm font-label">We'll get back to you soon.</p>
                  </div>
                </div>
              }

              <!-- Full Name -->
              <div class="space-y-2">
                <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  ngModel
                  required
                  #nameRef="ngModel"
                  placeholder="Ex: Tenzin Dorji"
                  class="w-full px-6 py-4 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary transition-all text-on-surface font-body outline-none"
                  [ngClass]="nameRef.invalid && nameRef.touched ? 'ring-2 ring-error' : ''"
                />
                @if (nameRef.invalid && nameRef.touched) {
                  <p class="text-error text-xs mt-1">Name is required.</p>
                }
              </div>

              <!-- Email + Phone -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    ngModel
                    required
                    email
                    #emailRef="ngModel"
                    placeholder="you@email.com"
                    class="w-full px-6 py-4 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary transition-all text-on-surface font-body outline-none"
                    [ngClass]="emailRef.invalid && emailRef.touched ? 'ring-2 ring-error' : ''"
                  />
                  @if (emailRef.invalid && emailRef.touched) {
                    <p class="text-error text-xs">Valid email required.</p>
                  }
                </div>
                <div class="space-y-2">
                  <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    ngModel
                    placeholder="+975 980..."
                    class="w-full px-6 py-4 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary transition-all text-on-surface font-body outline-none"
                  />
                </div>
              </div>

              <!-- Service chips -->
              <div class="space-y-2">
                <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Service Required</label>
                <div class="flex flex-wrap gap-3">
                  @for (chip of serviceChips; track chip) {
                    <button
                      type="button"
                      (click)="toggleChip(chip)"
                      class="px-5 py-2 rounded-full font-label text-sm font-medium transition-colors"
                      [ngClass]="selectedChips().includes(chip)
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container'"
                    >{{ chip }}</button>
                  }
                </div>
              </div>

              <!-- Message -->
              <div class="space-y-2">
                <label class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Your Message</label>
                <textarea
                  name="message"
                  ngModel
                  required
                  #messageRef="ngModel"
                  rows="5"
                  placeholder="Tell us how we can help clarify your vision..."
                  class="w-full px-6 py-4 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary transition-all text-on-surface font-body resize-none outline-none"
                  [ngClass]="messageRef.invalid && messageRef.touched ? 'ring-2 ring-error' : ''"
                ></textarea>
                @if (messageRef.invalid && messageRef.touched) {
                  <p class="text-error text-xs mt-1">Message is required.</p>
                }
              </div>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="sending()"
                class="w-full hero-gradient text-on-primary font-headline font-bold py-5 rounded-xl text-lg hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                @if (sending()) {
                  <i class="pi pi-spin pi-spinner"></i> Sending...
                } @else {
                  Send Vision Request
                }
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  `,
})
export class ContactComponent {
  private contactService = inject(ContactService);
  sending = signal(false);
  submitted = signal(false);
  selectedChips = signal<string[]>(['Eye Exam']);

  serviceChips = ['Eye Exam', 'Frame Fitting', 'Contact Lenses', 'Repair'];

  toggleChip(chip: string) {
    this.selectedChips.update(chips =>
      chips.includes(chip) ? chips.filter(c => c !== chip) : [...chips, chip]
    );
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    try {
      await this.contactService.sendMessage({
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || '',
        message: form.value.message,
      });
      this.submitted.set(true);
      form.reset();
      this.selectedChips.set(['Eye Exam']);
      setTimeout(() => this.submitted.set(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      this.sending.set(false);
    }
  }
}
