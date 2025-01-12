import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  totalQuantity: number = 0; 
  totalprice: number = 0; 

  showPopup: boolean = false;
  showCart:boolean = false;
  products: any[] = [];
  cartItems: any[] = [];
  uploadedImage: File | null = null;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.updateCartSummary();
  }

  // Open product add popup
  openPopup() {
    this.showPopup = true;
  }

  // Close product add popup
  closePopup() {
    this.showPopup = false;
  }

  // Open cart summary popup
  openCartPopup() {
    this.showCart = true;    
  }
  // Close cart summary popup
  closeCartPopup() {
    this.showCart = false;
  }

  // Fetch all products from the service
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

  // Handle image upload
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
    }
  }

  // Handle image load error
  handleImageError(event: any) {
    console.error('Image failed to load:', event);
    event.target.src = 'assets/placeholder-image.png'; // Placeholder image path
  }

  // Submit new product form
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

  // Add product to cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.updateCartSummary();
  }

  // Remove product from cart
  removeFromCart(productId: any): void {
    this.cartService.removeFromCart(productId);
    this.updateCartSummary();
  }

  // Update cart summary (total quantity and price)
  updateCartSummary(): void {
    const cartItems = this.cartService.getCartItems();
    this.cartItems = cartItems;
    this.totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalprice = this.cartService.getTotalPrice();
  }

  // Checkout action
  checkout(): void {
    this.cartService.clearCart();
    this.updateCartSummary();
    this.closeCartPopup();
  }


}
