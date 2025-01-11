import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showPopup: boolean = false;
  products: any[] = [];
  uploadedImage: File | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log('Products fetched successfully:', this.products);
        if (this.products.length > 0) {
          console.log('First product image path:', this.products[0].image);
        }
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
    event.target.src = 'assets/placeholder-image.png'; // Add a placeholder image in your assets folder
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
}
