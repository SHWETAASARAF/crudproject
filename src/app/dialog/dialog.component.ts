import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnesslist = ['Brand New', 'Glowing Skin','Best Tested']
  productForm !: FormGroup;
  actionbtn:string ='save'
  constructor(private formbuilder:FormBuilder ,private api:ApiService ,private dialogref:MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public editdata:any) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName:['',Validators.required],
      productCategory:['',Validators.required],
      Date:['' ,Validators.required],
      productFreshness:['',Validators.required],
      productPrice:['',Validators.required],
      productReview:['',Validators.required]
    })
    if(this.editdata){
      this.actionbtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editdata.productName);
      this.productForm.controls['productCategory'].setValue(this.editdata.productCategory);
      this.productForm.controls['Date'].setValue(this.editdata.Date);
      this.productForm.controls['productFreshness'].setValue(this.editdata.productFreshness);
      this.productForm.controls['productPrice'].setValue(this.editdata. productPrice);
      this.productForm.controls['productReview'].setValue(this.editdata.productReview);
    }
  }
  addProduct(){
  if(!this.editdata){
    if(this.productForm.valid){
      this.api.postproduct(this.productForm.value)
      .subscribe({
       next:(res)=>{
         alert('Product added to card successfully')
         this.productForm.reset();
         this.dialogref.close('product save');
       },
       error:()=>{
         alert('Error while adding the product')
       }
      })
    }
  }else{
    this.UpdateProduct()
  }
  }
  UpdateProduct(){
    this.api.putproduct(this.productForm.value,this.editdata .id)
    .subscribe({
      next:(res)=>{
        alert('Product Updated successfully');
        this.productForm.reset();
        this.dialogref.close('update')
      },
      error:()=>{
        alert('Error while updating the record');
      }
    })
  }
}
