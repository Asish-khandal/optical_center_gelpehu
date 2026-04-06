import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AppointmentService } from '../../core/services/appointment.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <main class="pt-24 pb-20 min-h-screen" style="background:#f8fafb;">
      <div class="max-w-3xl mx-auto px-6">

        <!-- Header -->
        <div class="mb-12 text-center">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style="background:#003331;">
            <span class="material-symbols-outlined text-white text-3xl">calendar_month</span>
          </div>
          <h1 class="text-4xl font-extrabold mb-3" style="color:#003331; font-family:'Manrope',sans-serif;">Book an Appointment</h1>
          <p class="text-slate-500 max-w-md mx-auto">Schedule a visit at Himalayan Optical Center, Gelephu. We'll confirm your booking by phone.</p>
        </div>

        <!-- Success -->
        @if (submitted()) {
          <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4 mb-8">
            <span class="material-symbols-outlined text-emerald-600 text-3xl">check_circle</span>
            <div>
              <p class="font-bold text-emerald-800 text-lg">Appointment Requested!</p>
              <p class="text-emerald-600 text-sm mt-1">We'll call you at <strong>{{ confirmedPhone() }}</strong> within 24 hours to confirm your slot.</p>
            </div>
          </div>
        }

        <!-- Form Card -->
        <div class="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <form #apptForm="ngForm" (ngSubmit)="onSubmit(apptForm)" novalidate class="space-y-6">

            <!-- Name + Phone -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Full Name *</label>
                <input type="text" name="name" ngModel required #nameRef="ngModel"
                  placeholder="Asish Khandal"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 text-slate-800 text-sm"
                  [ngClass]="nameRef.invalid && nameRef.touched ? 'border-red-400 ring-red-200' : 'focus:ring-teal-200'"
                />
                @if (nameRef.invalid && nameRef.touched) {
                  <p class="text-red-500 text-xs">Name is required.</p>
                }
              </div>
              <div class="space-y-2">
                <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number *</label>
                <input type="tel" name="phone" ngModel required #phoneRef="ngModel"
                  placeholder="+975 17xxxxxx"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 text-slate-800 text-sm"
                  [ngClass]="phoneRef.invalid && phoneRef.touched ? 'border-red-400 ring-red-200' : 'focus:ring-teal-200'"
                />
                @if (phoneRef.invalid && phoneRef.touched) {
                  <p class="text-red-500 text-xs">Phone is required.</p>
                }
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Email (Optional)</label>
              <input type="email" name="email" ngModel
                placeholder="you@email.com"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-200 text-slate-800 text-sm"
              />
            </div>

            <!-- Service -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Service Required *</label>
              <select name="service" ngModel required #serviceRef="ngModel"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 text-slate-700 text-sm"
                [ngClass]="serviceRef.invalid && serviceRef.touched ? 'border-red-400' : 'focus:ring-teal-200'"
              >
                <option value="" disabled selected>Select a service...</option>
                <option value="Eye Exam">Eye Examination</option>
                <option value="Frame Fitting">Frame Fitting & Selection</option>
                <option value="Contact Lenses">Contact Lens Fitting</option>
                <option value="Prescription Glasses">Prescription Glasses</option>
                <option value="Sunglasses">Sunglasses Fitting</option>
                <option value="Repair">Eyewear Repair</option>
                <option value="Consultation">General Consultation</option>
              </select>
              @if (serviceRef.invalid && serviceRef.touched) {
                <p class="text-red-500 text-xs">Please select a service.</p>
              }
            </div>

            <!-- Date + Time -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Preferred Date *</label>
                <input type="date" name="date" ngModel required #dateRef="ngModel"
                  [min]="minDate"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 text-slate-800 text-sm"
                  [ngClass]="dateRef.invalid && dateRef.touched ? 'border-red-400' : 'focus:ring-teal-200'"
                />
                @if (dateRef.invalid && dateRef.touched) {
                  <p class="text-red-500 text-xs">Date is required.</p>
                }
              </div>
              <div class="space-y-2">
                <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Preferred Time *</label>
                <select name="time" ngModel required #timeRef="ngModel"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 text-slate-700 text-sm"
                  [ngClass]="timeRef.invalid && timeRef.touched ? 'border-red-400' : 'focus:ring-teal-200'"
                >
                  <option value="" disabled selected>Select time...</option>
                  @for (slot of timeSlots; track slot) {
                    <option [value]="slot">{{ slot }}</option>
                  }
                </select>
                @if (timeRef.invalid && timeRef.touched) {
                  <p class="text-red-500 text-xs">Time is required.</p>
                }
              </div>
            </div>

            <!-- Notes -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-widest text-slate-400">Additional Notes</label>
              <textarea name="notes" ngModel rows="3"
                placeholder="Any specific requirements or questions..."
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-200 text-slate-800 text-sm resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="saving()"
              class="w-full py-4 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style="background:#003331;"
            >
              @if (saving()) {
                <i class="pi pi-spin pi-spinner"></i> Booking...
              } @else {
                <span class="material-symbols-outlined">calendar_add_on</span>
                Confirm Appointment
              }
            </button>

            <p class="text-center text-xs text-slate-400">
              Mon – Sat, 9:00 AM – 7:00 PM &middot; +975-17635837
            </p>

          </form>
        </div>

        <!-- Info cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div class="bg-white rounded-2xl p-5 text-center shadow-sm">
            <span class="material-symbols-outlined block mb-2 text-2xl" style="color:#003331;">location_on</span>
            <p class="text-xs font-bold text-slate-700">Gelephu Town</p>
            <p class="text-xs text-slate-400">Near Main Market</p>
          </div>
          <div class="bg-white rounded-2xl p-5 text-center shadow-sm">
            <span class="material-symbols-outlined block mb-2 text-2xl" style="color:#003331;">schedule</span>
            <p class="text-xs font-bold text-slate-700">Mon – Sat</p>
            <p class="text-xs text-slate-400">9:00 AM – 7:00 PM</p>
          </div>
          <div class="bg-white rounded-2xl p-5 text-center shadow-sm">
            <span class="material-symbols-outlined block mb-2 text-2xl" style="color:#003331;">call</span>
            <p class="text-xs font-bold text-slate-700">+975-17635837</p>
            <p class="text-xs text-slate-400">Call or WhatsApp</p>
          </div>
        </div>

      </div>
    </main>
  `,
})
export class AppointmentComponent {
  private apptService = inject(AppointmentService);
  saving = signal(false);
  submitted = signal(false);
  confirmedPhone = signal('');

  minDate = new Date().toISOString().split('T')[0];

  timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  ];

  async onSubmit(form: NgForm) {
    if (form.invalid) { form.form.markAllAsTouched(); return; }
    this.saving.set(true);
    try {
      await this.apptService.book({
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email || '',
        service: form.value.service,
        date: form.value.date,
        time: form.value.time,
        notes: form.value.notes || '',
      });
      this.confirmedPhone.set(form.value.phone);
      this.submitted.set(true);
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }
}
