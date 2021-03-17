import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText=""

  constructor(
    private productService: ProductService,
    private activatedRouted: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
      ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    });
    
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsbyCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  addToCart(product:Product){
    if(product.unitsInStock<2){
      this.toastrService.error("Sepete eklenemez","stokda kalmadı")
    }else{
      this.toastrService.success("Sepete eklendi",product.productName)
      this.cartService.addToCart(product)
    }}
    

}
