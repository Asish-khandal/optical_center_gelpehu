import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <!-- Hero -->
    <div class="pt-28 pb-16 relative overflow-hidden"
         style="background: linear-gradient(135deg, #06090f 0%, #0a1428 100%);">
      <div class="sparkle absolute w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none" style="right:15%;top:30%;"></div>
      <div class="sparkle sparkle-delay-2 absolute w-1 h-1 rounded-full bg-white pointer-events-none" style="left:30%;bottom:20%;"></div>
      <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
           style="background: linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent);"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Get In Touch</span>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-2">Contact Us</h1>
        <p class="text-slate-400 text-lg">We'd love to hear from you</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <!-- Left: Info + Map -->
        <div>
          <h2 class="font-display text-2xl font-bold text-gray-900 mb-6">Visit Our Store</h2>

          <!-- Contact info cards -->
          <div class="space-y-4 mb-8">
            @for (info of contactInfo; track info.label) {
              <div class="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-100 transition-all">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-200/30"
                     style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                  <i [class]="'pi ' + info.icon + ' text-lg text-white'"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{{ info.label }}</p>
                  @if (info.href) {
                    <a [href]="info.href" class="text-gray-800 font-semibold hover:text-amber-600 transition-colors">{{ info.value }}</a>
                  } @else {
                    <p class="text-gray-800 font-semibold">{{ info.value }}</p>
                  }
                </div>
              </div>
            }
          </div>

          <!-- WhatsApp CTA -->
          <a href="https://wa.me/97517635837" target="_blank"
             class="flex items-center gap-3 w-full px-6 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-colors justify-center mb-8 shadow-lg shadow-green-200">
            <i class="pi pi-whatsapp text-xl"></i> Chat on WhatsApp
          </a>

          <!-- Map embed -->
          <div class="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-64">
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
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="font-display text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
          <p class="text-gray-500 text-sm mb-8">We'll get back to you within 24 hours.</p>

          <!-- Success message -->
          @if (submitted()) {
            <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <i class="pi pi-check-circle text-green-600 text-xl"></i>
              <div>
                <p class="text-green-800 font-semibold">Message Sent!</p>
                <p class="text-green-600 text-sm">We'll get back to you soon.</p>
              </div>
            </div>
          }

          <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" novalidate>
            <!-- Name -->
            <div class="mb-5">
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="name"
                ngModel
                required
                #name="ngModel"
                placeholder="Your name"
                class="w-full px-4 py-3 border rounded-xl text-sm transition-all outline-none"
                [ngClass]="name.invalid && name.touched ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300' : 'border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'"
              />
              @if (name.invalid && name.touched) {
                <p class="text-red-500 text-xs mt-1">Name is required.</p>
              }
            </div>

            <!-- Email -->
            <div class="mb-5">
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                ngModel
                required
                email
                #email="ngModel"
                placeholder="you@email.com"
                class="w-full px-4 py-3 border rounded-xl text-sm transition-all outline-none"
                [ngClass]="email.invalid && email.touched ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300' : 'border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'"
              />
              @if (email.invalid && email.touched) {
                <p class="text-red-500 text-xs mt-1">Valid email is required.</p>
              }
            </div>

            <!-- Phone -->
            <div class="mb-5">
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="phone"
                ngModel
                placeholder="+977-XXXXXXXXX"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>

            <!-- Message -->
            <div class="mb-7">
              <label class="block text-sm font-bold text-gray-700 mb-1.5">Message *</label>
              <textarea
                name="message"
                ngModel
                required
                #message="ngModel"
                rows="5"
                placeholder="How can we help you?"
                class="w-full px-4 py-3 border rounded-xl text-sm transition-all resize-none outline-none"
                [ngClass]="message.invalid && message.touched ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300' : 'border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100'"
              ></textarea>
              @if (message.invalid && message.touched) {
                <p class="text-red-500 text-xs mt-1">Message is required.</p>
              }
            </div>

            <button
              type="submit"
              [disabled]="sending()"
              class="w-full py-4 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);"
            >
              @if (sending()) {
                <i class="pi pi-spin pi-spinner"></i> Sending...
              } @else {
                <i class="pi pi-send"></i> Send Message
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  private contactService = inject(ContactService);
  sending = signal(false);
  submitted = signal(false);

  contactInfo = [
    { icon: 'pi-map-marker', label: 'Address', value: 'Gelephu Town, Sarpang District, Bhutan', href: null },
    { icon: 'pi-phone', label: 'Phone / WhatsApp', value: '+975-17635837', href: 'tel:+97517635837' },
    { icon: 'pi-envelope', label: 'Email', value: 'info@himalayanoptical.bt', href: 'mailto:info@himalayanoptical.bt' },
    { icon: 'pi-clock', label: 'Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM', href: null },
  ];

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
      setTimeout(() => this.submitted.set(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      this.sending.set(false);
    }
  }
}
