import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { ContactMessage } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'contacts');

  sendMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<void> {
    return addDoc(this.col, { ...msg, createdAt: serverTimestamp() }).then(() => undefined);
  }
}
