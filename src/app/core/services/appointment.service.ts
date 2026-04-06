import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointment } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'appointments');

  book(appt: Omit<Appointment, 'id' | 'createdAt'>): Promise<void> {
    return addDoc(this.col, { ...appt, status: 'pending', createdAt: serverTimestamp() }).then(() => undefined);
  }

  getAll(): Observable<Appointment[]> {
    const q = query(this.col, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Appointment[]>;
  }

  updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<void> {
    return updateDoc(doc(this.firestore, 'appointments', id), { status });
  }

  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'appointments', id));
  }
}
