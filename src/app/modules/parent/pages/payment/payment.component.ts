import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parent } from 'src/app/data/parent';
import { payment } from 'src/app/data/payment';
import { ParentserviceService } from 'src/app/services/parentservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  Parent:string = '';
  Student:string = '';
  Amount:number = 0 ;
  mess:string=''
  loader:boolean=false;
  parent:any;
  today:Date=new Date();
  constructor(private parentservice:ParentserviceService,private router:ActivatedRoute, private parentService:ParentserviceService, private route:Router) {
  }
  ngOnInit(): void {
    let id=localStorage.getItem('uid')?.replace(/"/g,"")||'';
    this.parentservice.getbyidentity(id).subscribe({
      next:res=>{
        this.parent = res;
      }
    });
    this.Parent = this.router.snapshot.paramMap.get('parent') || ''
    this.Student = this.router.snapshot.paramMap.get('student') || ''
    this.Amount = +(this.router.snapshot.paramMap.get('amount') || '')
  }
  payment:FormGroup = new FormGroup({
    cardName: new FormControl('',[Validators.required]),
    cardNumber: new FormControl('',[Validators.required, Validators.pattern("^[0-9]{16}$")]),
    cardExpiryYear: new FormControl('',[Validators.required]),
    cardExpiryMonth: new FormControl('',[Validators.required,Validators.pattern("^([1-9]{1}|10|1[1-2]{1})$")]),
    cardCvc: new FormControl('',[Validators.required, Validators.pattern("^[0-9]{3}$")])
  });

  get cardnamecontrol(){
    return this.payment.controls['cardName']
  }get cardnumbercontrol(){
    return this.payment.controls['cardNumber']
  }get cardexpyearcontrol(){
    return this.payment.controls['cardExpiryYear']
  }get cardexpmonthcontrol(){
    return this.payment.controls['cardExpiryMonth']
  }get cardcvccontrol(){
    return this.payment.controls['cardCvc']
  }
  validateyear(){
    if(+this.cardexpyearcontrol.value<this.today.getFullYear()){
      this.cardexpyearcontrol.setErrors({'invalidyear':true});
    }
  }
  addpayment(){
    if(this.payment.valid){
      this.loader=true;
      let payment:payment = {
        parentID:this.Parent,
        studentID:this.Student,
        amount:this.Amount,
        ...this.payment.value
      }
      this.parentService.payment(payment).subscribe({
        next:res =>{
          this.mess='Success'
          this.loader=false;
          setTimeout(() => {
            this.route.navigate(['parent']);
          }, 3000);
        },error:e => {
          this.loader=false;
          this.mess='Failed'
        }

      });
    }
  }
}
