import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'products');

  getProducts(): Observable<Product[]> {
    const q = query(this.col, orderBy('name'));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Omit<Product, 'id'>): Promise<void> {
    return addDoc(this.col, { ...product, createdAt: serverTimestamp() }).then(() => undefined);
  }

  updateProduct(id: string, changes: Partial<Omit<Product, 'id'>>): Promise<void> {
    return updateDoc(doc(this.firestore, 'products', id), changes);
  }

  deleteProduct(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'products', id));
  }
}
