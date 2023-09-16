import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagerespnce',
  templateUrl: './messagerespnce.component.html',
  styleUrls: ['./messagerespnce.component.css']
})
export class MessagerespnceComponent implements OnInit{
  @Input()message:string='';
  @Input()type:string='';
  constructor(private route:Router){
  }
  ngOnInit(): void {

  }
}
