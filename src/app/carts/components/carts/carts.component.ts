import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  constructor(private service:CartsService,private bulid:FormBuilder,private modalService: NgbModal , private ProductService:ProductsService)  { }
  carts:any[]=[];
  form!:FormGroup;
  detials:any;
  closeResult = '';
  products:any[]=[];
  totla=0
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


  ngOnInit(): void {
    this.form = this.bulid.group({
      Start:[''],
      End:['']
    })
    this.getAllCarts()

}


getAllCarts() {
  this.service.getAllCarts().subscribe((res:any)=> {
    this.carts =res
  })
}
applyfilter(){
  //console.log(this.form.value)
  let date=this.form.value
  this.service.getAllCarts(date).subscribe((res:any)=> {
    this.carts =res
  })
 }
 deleteCart(id:number){
  this.service.deleteCart(id).subscribe(res =>{
    this.getAllCarts()
    alert("delete success")
  })
 }

 view(index:number){
  this.products=[]
  this.detials =this.carts[index];
  for(let x in this.detials.products) {
    this.ProductService.getproductsById(this.detials.products[x].productId).subscribe((res:any)=>{
      this.products.push({item : res,quantity:this.detials.products[x].quantity})
    })
  }
 }
}
