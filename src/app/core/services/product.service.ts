import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
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

  deleteProduct(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'products', id));
  }
}
