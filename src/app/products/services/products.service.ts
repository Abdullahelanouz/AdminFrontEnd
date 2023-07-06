import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getAllproducts(){
    return this.http.get(environment.baseApi +'products');

  }
  getAllcategories(){
    return this.http.get(environment.baseApi+'products/categories')
  }
  getproductsByCategory(keyword:string){
    return this.http.get(environment.baseApi+'products/category/'+keyword)
  }
  getproductsById(id:any){
    return this.http.get(environment.baseApi+'products/'+id)
  }

  createProduct(model:any) {
    return this.http.post(environment.baseApi +'products',model)
  }


}


