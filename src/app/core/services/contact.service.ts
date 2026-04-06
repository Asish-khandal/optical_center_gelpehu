import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'contacts');

  sendMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<void> {
    return addDoc(this.col, { ...msg, createdAt: serverTimestamp() }).then(() => undefined);
  }

  getMessages(): Observable<ContactMessage[]> {
    const q = query(this.col, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<ContactMessage[]>;
  }

  deleteMessage(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'contacts', id));
  }

  markRead(id: string): Promise<void> {
    return updateDoc(doc(this.firestore, 'contacts', id), { read: true });
  }

  toggleRead(id: string, current: boolean): Promise<void> {
    return updateDoc(doc(this.firestore, 'contacts', id), { read: !current });
  }
}
