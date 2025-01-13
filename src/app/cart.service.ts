import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private apiUrl = 'http://localhost:3000/mpesa/transactions';

  constructor( private http:HttpClient) { }

  addToCart(product: any): void {
    // Create a new cart item with all necessary properties
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      batch: product.batch,
      discount: product.discount,
      image: product.image
    };

    // Check if an identical product (same ID and batch) exists
    const existingProductIndex = this.cart.findIndex(
      item => item.id === product.id && item.batch === product.batch
    );

    if (existingProductIndex !== -1) {
      // If the exact same product exists, increase its quantity
      this.cart[existingProductIndex].quantity += 1;
    } else {
      // If it's a new product or different batch, add as new item
      this.cart.push(cartItem);
    }

    console.log('Updated Cart:', this.cart);
  }

  removeFromCart(productId: number, batch: string): void {
    // Find the index of the specific product with matching ID and batch
    const productIndex = this.cart.findIndex(
      item => item.id === productId && item.batch === batch
    );
    
    if (productIndex !== -1) {
      // Remove only that specific item
      this.cart.splice(productIndex, 1);
      console.log('Product removed from cart:', this.cart);
    }
  }
  recordTransaction(transaction: any): Observable<any> {
    return this.http.post(this.apiUrl, transaction);
  }
  getCartItems(): any[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
    console.log('Cart cleared:', this.cart);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}