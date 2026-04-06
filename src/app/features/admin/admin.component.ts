import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductFacade } from '../../core/facades/product.facade';
import { ContactService } from '../../core/services/contact.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { UploadService } from '../../core/services/upload.service';
import { Product } from '../../core/models/product.model';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';

const ADMIN_PASSWORD = 'himalayan2024';

type Tab = 'dashboard' | 'products' | 'messages' | 'appointments';

interface ProductForm {
  name: string;
  brand: string;
  price: number | null;
  category: 'eyeglass' | 'sunglass';
  imageUrl: string;
  description: string;
  inStock: boolean;
}

function emptyForm(): ProductForm {
  return { name: '', brand: '', price: null, category: 'eyeglass', imageUrl: '', description: '', inStock: true };
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe, DecimalPipe, TitleCasePipe],
  styles: [`
    .tab-btn { padding: 0.5rem 1.1rem; border-radius: 0.5rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.15s; background: transparent; color: #64748b; display:flex; align-items:center; gap:0.4rem; }
    .tab-btn.active { background: #003331; color: #fff; }
    .tab-btn:hover:not(.active) { background: #f1f5f9; color: #1e293b; }
    .field label { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 0.35rem; }
    .field input, .field select, .field textarea { width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid #e2e8f0; border-radius: 0.6rem; font-size: 0.875rem; color: #1e293b; outline: none; transition: border 0.15s; background: #fff; }
    .field input:focus, .field select:focus, .field textarea:focus { border-color: #003331; }
    .btn-primary { background: #003331; color: #fff; padding: 0.65rem 1.5rem; border-radius: 0.6rem; font-size: 0.875rem; font-weight: 700; border: none; cursor: pointer; transition: opacity 0.15s; }
    .btn-primary:hover { opacity: 0.88; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-danger { background: #fee2e2; color: #b91c1c; padding: 0.4rem 0.85rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; border: none; cursor: pointer; transition: background 0.15s; }
    .btn-danger:hover { background: #fecaca; }
    .btn-edit { background: #f0fdf4; color: #15803d; padding: 0.4rem 0.85rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; border: none; cursor: pointer; transition: background 0.15s; }
    .btn-edit:hover { background: #dcfce7; }
    .stock-badge { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; }
    .in-stock { background: #dcfce7; color: #166534; }
    .out-stock { background: #fee2e2; color: #991b1b; }
    .upload-area { border: 2px dashed #e2e8f0; border-radius: 0.75rem; padding: 1.25rem; text-align: center; cursor: pointer; transition: border 0.15s; }
    .upload-area:hover { border-color: #003331; }
    .progress-bar { height: 6px; background: #e2e8f0; border-radius: 9999px; overflow: hidden; margin-top: 0.5rem; }
    .progress-fill { height: 100%; background: #003331; border-radius: 9999px; transition: width 0.2s; }
    .unread-dot { width: 8px; height: 8px; background: #003331; border-radius: 9999px; flex-shrink: 0; }
    .mobile-nav-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15rem; padding: 0.5rem 0.25rem; font-size: 0.65rem; font-weight: 600; color: #94a3b8; border: none; background: transparent; cursor: pointer; transition: color 0.15s; }
    .mobile-nav-btn.mobile-nav-active { color: #003331; }
    .mobile-nav-btn.mobile-nav-active span.material-symbols-outlined { font-variation-settings: 'FILL' 1; }
  `],
  template: `
    <!-- ===== LOGIN SCREEN ===== -->
    @if (!loggedIn()) {
      <div class="min-h-screen flex items-center justify-center bg-slate-50">
        <div class="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm">
          <div class="text-center mb-8">
            <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style="background:#003331;">
              <span class="material-symbols-outlined text-white text-2xl">admin_panel_settings</span>
            </div>
            <h1 class="text-2xl font-bold" style="color:#003331;">Admin Panel</h1>
            <p class="text-slate-500 text-sm mt-1">Himalayan Optical Center</p>
          </div>
          <div class="field mb-6">
            <label>Password</label>
            <input type="password" [(ngModel)]="passwordInput" (keydown.enter)="login()" placeholder="Enter admin password" />
          </div>
          @if (loginError()) {
            <p class="text-red-500 text-sm mb-4 text-center">Incorrect password. Try again.</p>
          }
          <button class="btn-primary w-full" (click)="login()">Sign In</button>
        </div>
      </div>
    }

    <!-- ===== ADMIN DASHBOARD ===== -->
    @if (loggedIn()) {
      <div class="min-h-screen bg-slate-50">

        <!-- Top bar -->
        <header class="bg-white border-b border-slate-100 sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-2xl" style="color:#003331;">admin_panel_settings</span>
              <div>
                <h1 class="font-bold text-slate-800 text-base leading-none">Admin Panel</h1>
                <p class="text-xs text-slate-400 hidden sm:block">Himalayan Optical Center</p>
              </div>
            </div>
            <!-- Desktop tabs -->
            <div class="hidden md:flex items-center gap-2">
              <div class="flex gap-1 bg-slate-100 rounded-xl p-1">
                <button class="tab-btn" [class.active]="activeTab() === 'dashboard'" (click)="activeTab.set('dashboard')">
                  <span class="material-symbols-outlined" style="font-size:16px;">dashboard</span> Dashboard
                </button>
                <button class="tab-btn" [class.active]="activeTab() === 'products'" (click)="activeTab.set('products')">
                  <span class="material-symbols-outlined" style="font-size:16px;">inventory_2</span> Products ({{ facade.products().length }})
                </button>
                <button class="tab-btn" [class.active]="activeTab() === 'messages'" (click)="activeTab.set('messages')">
                  <span class="material-symbols-outlined" style="font-size:16px;">mail</span> Messages
                  @if (unreadCount() > 0) {
                    <span style="background:#003331; color:#fff; font-size:0.65rem; font-weight:800; padding:0.1rem 0.45rem; border-radius:9999px;">{{ unreadCount() }}</span>
                  }
                </button>
                <button class="tab-btn" [class.active]="activeTab() === 'appointments'" (click)="activeTab.set('appointments')">
                  <span class="material-symbols-outlined" style="font-size:16px;">calendar_month</span> Appointments
                  @if (pendingApptCount() > 0) {
                    <span style="background:#f59e0b; color:#fff; font-size:0.65rem; font-weight:800; padding:0.1rem 0.45rem; border-radius:9999px;">{{ pendingApptCount() }}</span>
                  }
                </button>
              </div>
              <a routerLink="/" class="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 ml-1" title="View Website">
                <span class="material-symbols-outlined" style="font-size:20px;">open_in_new</span>
              </a>
              <button (click)="logout()" class="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1" title="Logout">
                <span class="material-symbols-outlined" style="font-size:20px;">logout</span>
              </button>
            </div>
            <!-- Mobile top-right actions -->
            <div class="flex md:hidden items-center gap-3">
              <a routerLink="/" class="text-slate-500" title="View Website">
                <span class="material-symbols-outlined" style="font-size:22px;">open_in_new</span>
              </a>
              <button (click)="logout()" class="text-slate-500" title="Logout">
                <span class="material-symbols-outlined" style="font-size:22px;">logout</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Mobile bottom nav -->
        <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 flex">
          <button class="mobile-nav-btn flex-1" [class.mobile-nav-active]="activeTab() === 'dashboard'" (click)="activeTab.set('dashboard')">
            <span class="material-symbols-outlined" style="font-size:22px;">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button class="mobile-nav-btn flex-1" [class.mobile-nav-active]="activeTab() === 'products'" (click)="activeTab.set('products')">
            <span class="material-symbols-outlined" style="font-size:22px;">inventory_2</span>
            <span>Products</span>
          </button>
          <button class="mobile-nav-btn flex-1 relative" [class.mobile-nav-active]="activeTab() === 'messages'" (click)="activeTab.set('messages')">
            <span class="material-symbols-outlined" style="font-size:22px;">mail</span>
            @if (unreadCount() > 0) {
              <span class="absolute top-2 right-6 w-4 h-4 rounded-full text-white flex items-center justify-center" style="background:#003331; font-size:0.6rem; font-weight:800;">{{ unreadCount() }}</span>
            }
            <span>Messages</span>
          </button>
          <button class="mobile-nav-btn flex-1 relative" [class.mobile-nav-active]="activeTab() === 'appointments'" (click)="activeTab.set('appointments')">
            <span class="material-symbols-outlined" style="font-size:22px;">calendar_month</span>
            @if (pendingApptCount() > 0) {
              <span class="absolute top-2 right-6 w-4 h-4 rounded-full text-white flex items-center justify-center" style="background:#f59e0b; font-size:0.6rem; font-weight:800;">{{ pendingApptCount() }}</span>
            }
            <span>Appts</span>
          </button>
        </nav>

        <div class="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8 pb-24 md:pb-8">

          <!-- ===== DASHBOARD TAB ===== -->
          @if (activeTab() === 'dashboard') {
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-bold text-slate-800 mb-1">Overview</h2>
                <p class="text-slate-500 text-sm">Summary of your store activity.</p>
              </div>

              <!-- Stat Cards -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white rounded-2xl p-5 shadow-sm">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style="background:#e8f4f3;">
                    <span class="material-symbols-outlined" style="color:#003331; font-size:22px;">inventory_2</span>
                  </div>
                  <p class="text-3xl font-extrabold" style="color:#003331;">{{ facade.products().length }}</p>
                  <p class="text-xs text-slate-500 font-medium mt-1">Total Products</p>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style="background:#dcfce7;">
                    <span class="material-symbols-outlined" style="color:#166534; font-size:22px;">check_circle</span>
                  </div>
                  <p class="text-3xl font-extrabold text-green-700">{{ inStockCount() }}</p>
                  <p class="text-xs text-slate-500 font-medium mt-1">In Stock</p>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style="background:#fef3c7;">
                    <span class="material-symbols-outlined" style="color:#92400e; font-size:22px;">mail</span>
                  </div>
                  <p class="text-3xl font-extrabold text-amber-700">{{ unreadCount() }}</p>
                  <p class="text-xs text-slate-500 font-medium mt-1">Unread Messages</p>
                </div>
                <div class="bg-white rounded-2xl p-5 shadow-sm">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style="background:#ede9fe;">
                    <span class="material-symbols-outlined" style="color:#5b21b6; font-size:22px;">calendar_month</span>
                  </div>
                  <p class="text-3xl font-extrabold text-violet-700">{{ pendingApptCount() }}</p>
                  <p class="text-xs text-slate-500 font-medium mt-1">Pending Appointments</p>
                </div>
              </div>

              <!-- Category breakdown -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 class="font-bold text-slate-700 mb-4">Products by Category</h3>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <div class="flex-1">
                        <div class="flex justify-between text-sm mb-1">
                          <span class="font-medium text-slate-700">Eyeglasses</span>
                          <span class="font-bold" style="color:#003331;">{{ eyeglassCount() }}</span>
                        </div>
                        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full rounded-full" style="background:#003331;"
                            [style.width]="facade.products().length ? (eyeglassCount() / facade.products().length * 100) + '%' : '0%'"></div>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="flex-1">
                        <div class="flex justify-between text-sm mb-1">
                          <span class="font-medium text-slate-700">Sunglasses</span>
                          <span class="font-bold" style="color:#4a6360;">{{ sunglassCount() }}</span>
                        </div>
                        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div class="h-full rounded-full" style="background:#4a6360;"
                            [style.width]="facade.products().length ? (sunglassCount() / facade.products().length * 100) + '%' : '0%'"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recent messages preview -->
                <div class="bg-white rounded-2xl p-6 shadow-sm">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-slate-700">Recent Messages</h3>
                    <button (click)="activeTab.set('messages')" class="text-xs font-semibold hover:underline" style="color:#003331;">View all</button>
                  </div>
                  @if (messages().length === 0) {
                    <p class="text-slate-400 text-sm">No messages yet.</p>
                  } @else {
                    <div class="space-y-3">
                      @for (msg of messages().slice(0,3); track msg.id) {
                        <div class="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
                          @if (!msg.read) { <span class="unread-dot mt-1.5"></span> }
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-slate-800 truncate">{{ msg.name }}</p>
                            <p class="text-xs text-slate-400 truncate">{{ msg.message }}</p>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- ===== PRODUCTS TAB ===== -->
          @if (activeTab() === 'products') {
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <!-- Add / Edit Form -->
              <div class="lg:col-span-1">
                <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  <h2 class="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span class="material-symbols-outlined text-xl" style="color:#003331;">{{ editingId() ? 'edit' : 'add_circle' }}</span>
                    {{ editingId() ? 'Edit Product' : 'Add New Product' }}
                  </h2>

                  <form class="space-y-4" (ngSubmit)="saveProduct()">
                    <div class="field">
                      <label>Product Name *</label>
                      <input type="text" [(ngModel)]="form.name" name="name" placeholder="e.g. Titanium Aviator" required />
                    </div>
                    <div class="field">
                      <label>Brand</label>
                      <input type="text" [(ngModel)]="form.brand" name="brand" placeholder="e.g. Ray-Ban, Oakley" />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <div class="field">
                        <label>Price (Nu) *</label>
                        <input type="number" [(ngModel)]="form.price" name="price" placeholder="1500" required min="0" />
                      </div>
                      <div class="field">
                        <label>Category *</label>
                        <select [(ngModel)]="form.category" name="category">
                          <option value="eyeglass">Eyeglasses</option>
                          <option value="sunglass">Sunglasses</option>
                        </select>
                      </div>
                    </div>

                    <!-- Image Upload -->
                    <div class="field">
                      <label>Product Image</label>
                      @if (form.imageUrl) {
                        <div class="relative mb-2">
                          <img [src]="form.imageUrl" class="w-full h-36 object-cover rounded-xl border border-slate-100" alt="preview" />
                          <button type="button" (click)="form.imageUrl = ''"
                            class="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors">
                            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
                          </button>
                        </div>
                      }
                      <label class="upload-area block" [style.border-color]="uploadProgress() > 0 && uploadProgress() < 100 ? '#003331' : ''">
                        <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)" />
                        @if (uploadProgress() > 0 && uploadProgress() < 100) {
                          <p class="text-xs font-semibold text-slate-600 mb-1">Uploading {{ uploadProgress() }}%</p>
                          <div class="progress-bar"><div class="progress-fill" [style.width]="uploadProgress() + '%'"></div></div>
                        } @else {
                          <span class="material-symbols-outlined text-slate-400 block mb-1" style="font-size:28px;">upload</span>
                          <p class="text-xs text-slate-500">Click to upload image</p>
                          <p class="text-xs text-slate-400 mt-0.5">or paste URL below</p>
                        }
                      </label>
                      <input type="url" [(ngModel)]="form.imageUrl" name="imageUrl" placeholder="https://..." class="mt-2" style="width:100%; padding:0.5rem 0.75rem; border:1.5px solid #e2e8f0; border-radius:0.5rem; font-size:0.8rem; outline:none;" />
                    </div>

                    <div class="field">
                      <label>Description</label>
                      <textarea [(ngModel)]="form.description" name="description" rows="2" placeholder="Brief description..."></textarea>
                    </div>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" [(ngModel)]="form.inStock" name="inStock" class="w-4 h-4 accent-green-600" />
                      <span class="text-sm font-medium text-slate-700">In Stock</span>
                    </label>

                    <div class="flex gap-2 pt-2">
                      <button type="submit" class="btn-primary flex-1" [disabled]="saving() || (uploadProgress() > 0 && uploadProgress() < 100)">
                        {{ saving() ? 'Saving...' : editingId() ? 'Update Product' : 'Add Product' }}
                      </button>
                      @if (editingId()) {
                        <button type="button" (click)="cancelEdit()"
                          class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                          Cancel
                        </button>
                      }
                    </div>
                  </form>
                </div>
              </div>

              <!-- Product List -->
              <div class="lg:col-span-2">
                <div class="flex justify-between items-center mb-4 flex-wrap gap-3">
                  <h2 class="font-bold text-slate-800">All Products ({{ facade.products().length }})</h2>
                  <div class="flex gap-2 items-center">
                    <!-- Out of stock filter -->
                    <label class="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input type="checkbox" [(ngModel)]="showOutOfStock" class="w-4 h-4 accent-red-500" />
                      <span class="text-slate-600 font-medium">Out of stock only</span>
                    </label>
                    <div class="relative">
                      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style="font-size:16px;">search</span>
                      <input type="text" [(ngModel)]="productSearch" placeholder="Search..."
                        class="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-slate-400 w-40" />
                    </div>
                  </div>
                </div>

                @if (filteredAdminProducts().length === 0) {
                  <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <span class="material-symbols-outlined text-slate-300 text-5xl mb-3 block">inventory_2</span>
                    <p class="text-slate-500 font-medium">No products found.</p>
                  </div>
                } @else {
                  <div class="space-y-3">
                    @for (p of filteredAdminProducts(); track p.id) {
                      <div class="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <img [src]="p.imageUrl || 'https://placehold.co/80x80/f1f5f9/003331?text=No+Img'"
                          class="w-16 h-16 rounded-lg object-cover bg-slate-100 flex-shrink-0" [alt]="p.name" />
                        <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2">
                            <div>
                              <p class="font-bold text-slate-800 text-sm truncate">{{ p.name }}</p>
                              @if (p.brand) { <p class="text-xs text-slate-400">{{ p.brand }}</p> }
                            </div>
                            <div class="flex items-center gap-2 flex-shrink-0">
                              <span class="text-sm font-bold" style="color:#003331;">Nu {{ p.price | number }}</span>
                              <span class="stock-badge" [class.in-stock]="p.inStock !== false" [class.out-stock]="p.inStock === false">
                                {{ p.inStock !== false ? 'In Stock' : 'Out' }}
                              </span>
                              <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                                [style.background]="p.category === 'sunglass' ? '#cae5e1' : '#e0f2fe'"
                                [style.color]="p.category === 'sunglass' ? '#003331' : '#0369a1'">
                                {{ p.category === 'sunglass' ? 'Sunglass' : 'Eyeglass' }}
                              </span>
                            </div>
                          </div>
                          @if (p.description) {
                            <p class="text-xs text-slate-400 mt-1 line-clamp-1">{{ p.description }}</p>
                          }
                        </div>
                        <div class="flex gap-2 flex-shrink-0">
                          <button class="btn-edit" (click)="startEdit(p)">Edit</button>
                          <button class="btn-danger" (click)="confirmDelete(p)">Delete</button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          }

          <!-- ===== MESSAGES TAB ===== -->
          @if (activeTab() === 'messages') {
            <div>
              <div class="flex justify-between items-center mb-6">
                <h2 class="font-bold text-slate-800">Customer Messages ({{ messages().length }})</h2>
                @if (unreadCount() > 0) {
                  <button (click)="markAllRead()" class="text-sm font-semibold hover:underline" style="color:#003331;">
                    Mark all as read
                  </button>
                }
              </div>

              @if (messages().length === 0) {
                <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <span class="material-symbols-outlined text-slate-300 text-5xl mb-3 block">mail</span>
                  <p class="text-slate-500 font-medium">No messages yet.</p>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (msg of messages(); track msg.id) {
                    <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow border-l-4"
                      [style.border-left-color]="msg.read ? '#e2e8f0' : '#003331'">
                      <div class="flex justify-between items-start mb-3">
                        <div class="flex items-center gap-2">
                          @if (!msg.read) { <span class="unread-dot"></span> }
                          <div>
                            <p class="font-bold text-slate-800 text-sm">{{ msg.name }}</p>
                            <a [href]="'mailto:' + msg.email" class="text-xs text-blue-600 hover:underline">{{ msg.email }}</a>
                            @if (msg.phone) { <p class="text-xs text-slate-400">{{ msg.phone }}</p> }
                          </div>
                        </div>
                        <div class="flex items-center gap-1">
                          <button (click)="toggleRead(msg.id!, !!msg.read)"
                            class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                            [style.color]="msg.read ? '#94a3b8' : '#003331'"
                            [title]="msg.read ? 'Mark as unread' : 'Mark as read'">
                            <span class="material-symbols-outlined" style="font-size:16px;">{{ msg.read ? 'mark_email_unread' : 'done' }}</span>
                          </button>
                          <a [href]="'mailto:' + msg.email"
                            class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors text-blue-500"
                            title="Reply via email">
                            <span class="material-symbols-outlined" style="font-size:16px;">reply</span>
                          </a>
                          @if (msg.phone) {
                            <a [href]="'https://wa.me/' + msg.phone.replace(/\D/g, '')" target="_blank"
                              class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-green-50 transition-colors text-green-600"
                              title="WhatsApp">
                              <i class="pi pi-whatsapp text-sm"></i>
                            </a>
                          }
                          <button (click)="deleteMessage(msg.id!)"
                            class="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors text-red-400"
                            title="Delete">
                            <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
                          </button>
                        </div>
                      </div>
                      <p class="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-lg p-3">{{ msg.message }}</p>
                      @if (msg.createdAt) {
                        <p class="text-xs text-slate-400 mt-2">{{ msg.createdAt.toDate ? (msg.createdAt.toDate() | date:'medium') : (msg.createdAt | date:'medium') }}</p>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }

          <!-- ===== APPOINTMENTS TAB ===== -->
          @if (activeTab() === 'appointments') {
            <div>
              <div class="mb-6">
                <h2 class="font-bold text-slate-800 mb-3">Appointments ({{ appointments().length }})</h2>
                <div class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style="scrollbar-width:none;">
                  @for (s of apptStatuses; track s.value) {
                    <button
                      (click)="apptFilter.set(s.value)"
                      class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border whitespace-nowrap flex-shrink-0"
                      [style.background]="apptFilter() === s.value ? '#003331' : '#fff'"
                      [style.color]="apptFilter() === s.value ? '#fff' : '#64748b'"
                      [style.border-color]="apptFilter() === s.value ? '#003331' : '#e2e8f0'"
                    >{{ s.label }}</button>
                  }
                </div>
              </div>

              @if (filteredAppts().length === 0) {
                <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <span class="material-symbols-outlined text-slate-300 text-5xl mb-3 block">calendar_month</span>
                  <p class="text-slate-500 font-medium">No appointments found.</p>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  @for (appt of filteredAppts(); track appt.id) {
                    <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div class="flex justify-between items-start mb-3">
                        <div>
                          <p class="font-bold text-slate-800">{{ appt.name }}</p>
                          <p class="text-xs text-slate-500">{{ appt.phone }}</p>
                          @if (appt.email) { <p class="text-xs text-slate-400">{{ appt.email }}</p> }
                        </div>
                        <span class="text-xs font-bold px-2 py-0.5 rounded-full"
                          [style.background]="appt.status === 'confirmed' ? '#dcfce7' : appt.status === 'cancelled' ? '#fee2e2' : '#fef3c7'"
                          [style.color]="appt.status === 'confirmed' ? '#166534' : appt.status === 'cancelled' ? '#991b1b' : '#92400e'">
                          {{ appt.status | titlecase }}
                        </span>
                      </div>
                      <div class="space-y-1.5 mb-4">
                        <div class="flex items-center gap-2 text-sm text-slate-600">
                          <span class="material-symbols-outlined text-slate-400" style="font-size:16px;">medical_services</span>
                          {{ appt.service }}
                        </div>
                        <div class="flex items-center gap-2 text-sm text-slate-600">
                          <span class="material-symbols-outlined text-slate-400" style="font-size:16px;">calendar_today</span>
                          {{ appt.date }} at {{ appt.time }}
                        </div>
                        @if (appt.notes) {
                          <div class="flex items-start gap-2 text-sm text-slate-500">
                            <span class="material-symbols-outlined text-slate-400 mt-0.5" style="font-size:16px;">notes</span>
                            {{ appt.notes }}
                          </div>
                        }
                      </div>
                      <div class="flex gap-2 flex-wrap">
                        @if (appt.status !== 'confirmed') {
                          <button (click)="updateApptStatus(appt.id!, 'confirmed')"
                            class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors"
                            style="background:#dcfce7; color:#166534;">
                            Confirm
                          </button>
                        }
                        @if (appt.status !== 'cancelled') {
                          <button (click)="updateApptStatus(appt.id!, 'cancelled')"
                            class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors"
                            style="background:#fee2e2; color:#991b1b;">
                            Cancel
                          </button>
                        }
                        <a [href]="'https://wa.me/' + appt.phone.replace(/\D/g, '')" target="_blank"
                          class="w-8 h-7 flex items-center justify-center rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                          title="WhatsApp">
                          <i class="pi pi-whatsapp text-sm"></i>
                        </a>
                        <button (click)="deleteAppt(appt.id!)"
                          class="w-8 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                          <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }

        </div>
      </div>

      <!-- Delete confirmation modal -->
      @if (deleteTarget()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-symbols-outlined text-red-500 text-2xl">delete_forever</span>
            </div>
            <h3 class="font-bold text-slate-800 text-lg text-center mb-2">Delete Product?</h3>
            <p class="text-slate-500 text-sm text-center mb-6">
              "<strong>{{ deleteTarget()!.name }}</strong>" will be permanently removed.
            </p>
            <div class="flex gap-3">
              <button (click)="deleteTarget.set(null)" class="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button (click)="doDelete()" class="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      }
    }
  `,
})
export class AdminComponent {
  facade = inject(ProductFacade);
  private contactService = inject(ContactService);
  private apptService = inject(AppointmentService);
  private uploadService = inject(UploadService);

  messages = toSignal(this.contactService.getMessages(), { initialValue: [] });
  appointments = toSignal(this.apptService.getAll(), { initialValue: [] });

  loggedIn = signal(localStorage.getItem('hoc_admin') === '1');
  loginError = signal(false);
  passwordInput = '';
  activeTab = signal<Tab>('dashboard');
  saving = signal(false);
  editingId = signal<string | null>(null);
  deleteTarget = signal<Product | null>(null);
  productSearch = '';
  showOutOfStock = false;
  uploadProgress = signal(0);
  apptFilter = signal<string>('all');

  form: ProductForm = emptyForm();

  apptStatuses = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  unreadCount = computed(() => this.messages().filter(m => !m.read).length);
  pendingApptCount = computed(() => this.appointments().filter(a => a.status === 'pending').length);
  inStockCount = computed(() => this.facade.products().filter(p => p.inStock !== false).length);
  eyeglassCount = computed(() => this.facade.products().filter(p => p.category === 'eyeglass').length);
  sunglassCount = computed(() => this.facade.products().filter(p => p.category === 'sunglass').length);

  filteredAdminProducts = computed(() => {
    const q = this.productSearch.toLowerCase();
    return this.facade.products().filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.brand ?? '').toLowerCase().includes(q);
      const matchStock = this.showOutOfStock ? p.inStock === false : true;
      return matchSearch && matchStock;
    });
  });

  filteredAppts = computed(() => {
    const f = this.apptFilter();
    return f === 'all' ? this.appointments() : this.appointments().filter(a => a.status === f);
  });

  login() {
    if (this.passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem('hoc_admin', '1');
      this.loggedIn.set(true);
      this.loginError.set(false);
    } else {
      this.loginError.set(true);
    }
  }

  logout() {
    localStorage.removeItem('hoc_admin');
    this.loggedIn.set(false);
    this.passwordInput = '';
  }

  startEdit(p: Product) {
    this.editingId.set(p.id);
    this.form = {
      name: p.name,
      brand: p.brand ?? '',
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl ?? '',
      description: p.description ?? '',
      inStock: p.inStock !== false,
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.form = emptyForm();
    this.uploadProgress.set(0);
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadProgress.set(1);
    try {
      const url = await this.uploadService.uploadProductImage(file, pct => this.uploadProgress.set(pct));
      this.form.imageUrl = url;
      this.uploadProgress.set(100);
      setTimeout(() => this.uploadProgress.set(0), 800);
    } catch (err) {
      console.error('Upload failed', err);
      this.uploadProgress.set(0);
    }
  }

  async saveProduct() {
    if (!this.form.name || !this.form.price) return;
    this.saving.set(true);
    try {
      const data = {
        name: this.form.name.trim(),
        brand: this.form.brand.trim(),
        price: Number(this.form.price),
        category: this.form.category,
        imageUrl: this.form.imageUrl.trim(),
        description: this.form.description.trim(),
        inStock: this.form.inStock,
      };
      if (this.editingId()) {
        await this.facade.updateProduct(this.editingId()!, data);
        this.editingId.set(null);
      } else {
        await this.facade.addProduct(data);
      }
      this.form = emptyForm();
      this.uploadProgress.set(0);
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(p: Product) { this.deleteTarget.set(p); }

  async doDelete() {
    if (this.deleteTarget()) {
      await this.facade.deleteProduct(this.deleteTarget()!.id);
      this.deleteTarget.set(null);
    }
  }

  async deleteMessage(id: string) { await this.contactService.deleteMessage(id); }

  async markRead(id: string) { await this.contactService.markRead(id); }

  async toggleRead(id: string, current: boolean) { await this.contactService.toggleRead(id, current); }

  async markAllRead() {
    const unread = this.messages().filter(m => !m.read && m.id);
    await Promise.all(unread.map(m => this.contactService.markRead(m.id!)));
  }

  async updateApptStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    await this.apptService.updateStatus(id, status);
  }

  async deleteAppt(id: string) { await this.apptService.delete(id); }
}
