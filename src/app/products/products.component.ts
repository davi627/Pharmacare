import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  totalQuantity: number = 0; 
  totalprice: number = 0; 

  showPopup: boolean = false;
  showCart: boolean = false;
  products: any[] = [];
  cartItems: any[] = [];
  uploadedImage: File | null = null;
  showPaymentPopup = false;
  showMpesaPopup = false;
  phoneNumber = '';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.updateCartSummary();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  openCartPopup() {
    this.showCart = true;    
  }

  closeCartPopup() {
    this.showCart = false;
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log('Products fetched successfully:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
    }
  }

  handleImageError(event: any) {
    console.error('Image failed to load:', event);
    event.target.src = 'assets/placeholder-image.png';
  }

  submitForm(form: any) {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('quantity', form.value.quantity);
    formData.append('batch', form.value.batch);
    formData.append('expiry', form.value.expiry);
    formData.append('discount', form.value.discount);

    if (this.uploadedImage) {
      formData.append('image', this.uploadedImage);
    }

    this.productsService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.closePopup();
        this.fetchProducts();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.updateCartSummary();
  }

  removeFromCart(productId: number, batch: string): void {
    this.cartService.removeFromCart(productId, batch);
    this.updateCartSummary();
  }

  updateCartSummary(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalprice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  checkout() {
    this.showPaymentPopup = true;
  }

  choosePayment(method: string) {
    this.showPaymentPopup = false;

    if (method === 'mpesa') {
      this.showMpesaPopup = true;
    } else {
      // Record cash payment transaction
      this.recordTransaction('cash', {});
      alert('Cash payment Done!');
    }
  }

  closeMpesaPopup() {
    this.showMpesaPopup = false;
  }

  processMpesaPayment() {
    if (!this.phoneNumber) {
      alert('Please enter a phone number!');
      return;
    }

    const paymentData = {
      amount: this.totalprice,
      phoneNumber: this.phoneNumber,
    };

    this.http.post('http://localhost:3000/mpesa/stkpush', paymentData).subscribe(
      (response: any) => {
        alert('Payment request sent. Please check your phone.');
        this.recordTransaction('mpesa', { phoneNumber: this.phoneNumber });
        this.showMpesaPopup = false;
      },
      (error) => {
        console.error('Payment error:', error);
        alert('Failed to process payment.');
      }
    );
  }

  recordTransaction(method: string, paymentDetails: any) {
    const transactionData = {
      method,
      amount: this.totalprice,
      items: this.cartItems,
      paymentDetails: method === 'mpesa' ? paymentDetails : null,
    };

    this.http.post('http://localhost:3000/transactions/transactions', transactionData).subscribe(
      (response: any) => {
        console.log('Transaction recorded successfully:', response);
      },
      (error) => {
        console.error('Error recording transaction:', error);
      }
    );
  }
}
