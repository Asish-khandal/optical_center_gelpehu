import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {

  /** Compress image and return base64 data URL — no Firebase Storage needed */
  uploadProductImage(
    file: File,
    onProgress: (pct: number) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      onProgress(10);
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = (e) => {
        onProgress(40);
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.onload = () => {
          onProgress(70);
          try {
            const base64 = this.compress(img, 800, 0.75);
            onProgress(100);
            resolve(base64);
          } catch (err) {
            reject(err);
          }
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  private compress(img: HTMLImageElement, maxSize: number, quality: number): string {
    const canvas = document.createElement('canvas');
    let { width, height } = img;
    if (width > height && width > maxSize) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else if (height > maxSize) {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', quality);
  }

  /** No-op: base64 is stored in Firestore, nothing to delete separately */
  deleteByUrl(_url: string): Promise<void> {
    return Promise.resolve();
  }
}
