import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:product[]=[];
  closeResult = '';
  categories:string[]=[];
  loading:boolean=false;
  cartproducts:any[]=[];
  base64:any='';
  form!:FormGroup;

  constructor(private service:ProductsService,private modalService: NgbModal , private ProductService:ProductsService , private build:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.build.group({
      title: [' ',[Validators.required]],
      price:  [' ' ,[Validators.required]  ],
      description:  [' ' ,[Validators.required]  ],
      image:  [' ' ,[Validators.required]  ],
      category:  [' ' ,[Validators.required]  ]

    })
    this.getproducts()
    this.getcategories()
  }

  getproducts(){
    this.loading=true
    this.service.getAllproducts().subscribe((res:any)=>{
      // console.log(res)
    this.products=res
    this.loading=false
    },error => {
      console.log(error.message)
      this.loading=false
    }
    )
  }

  getcategories(){
    this.loading=true
    this.service.getAllcategories().subscribe((res:any)=>{
    this.categories=res
    this.loading=false
    },error => {
      console.log(error.message)
      this.loading=false
    }
    )
  }
  filtercategory(event:any){
  this.form.get('category') ?.setValue(event.target.value)

  }
  getproductsCategory(keyword:string){
    this.loading=true
    this.service.getproductsByCategory(keyword).subscribe((res:any)=>{
      this.loading=false
     this.products =res
    })
  }

  addToCart(event:any) {
    // console.log(event)
    // JSON.stringify() //send Data
    // JSON.parse() //recive Data
    if ("cart" in localStorage) {
      this.cartproducts =JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item=>item.item.id==event.item.id)
      if(exist) {
        alert("products is already in your cart")
      } else {
        this.cartproducts.push(event)
        localStorage.setItem("cart",JSON.stringify(this.cartproducts))
      }

    } else {
      this.cartproducts.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartproducts))
    }

    // localStorage.setItem("cart",JSON.stringify(event))
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getImagePath(event :any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image') ?.setValue(this.base64)
    }
  }

  addProduct() {
    const model =this.form.value
    this.service.createProduct(model).subscribe(res =>{
      alert("add product success")
    })
    console.log(this.form)
  }
  update(item :any) {
    this.form.get('title')?.setValue(item.title)
    this.form.get('description')?.setValue(item.description)
    this.form.get('category')?.setValue(item.category)
    this.form.get('price')?.setValue(item.price)
    this.form.get('image')?.setValue(item.image)
    this.base64 =item.image

  }


}
