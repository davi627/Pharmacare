import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:any[]=[];//this is an array to hold the items in the cart

  constructor() { }
  addToCart(product:any):void{
    const existingProduct=this.cart.find(item=>item.id===product.id);
    if(existingProduct){
      existingProduct.quantity++;
    }else{
      this.cart.push({...product, quantity:1});
    }
    console.log('Added to cart:', this.cart);
  }
  //Removing the products from the cart
  removeFromCart(productId:number):void{
    this.cart=this.cart.filter(item=>item.id!==productId);
    console.log('Removed from cart:', this.cart);
  }
  //Getting the all items in the cart
  getCartItems():any[]{
    return this.cart;
  }
  //clearing the cart
  clearCart():void{
    this.cart=[];
    console.log('Cart cleared:', this.cart);
  }

  //getting the total price
  getTotalPrice():number{
    return this.cart.reduce((total,item)=>total+item.price*item.quantity,0);
  }
}
