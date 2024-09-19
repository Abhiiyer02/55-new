import { AnnualData } from './../models/annualData';
import { Investment } from './../models/investment';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {
  @Input({required:true}) annualData!: AnnualData[];
  // annualData : AnnualData[] = []
  // onSubmit(newInv:Investment){
  //   this.Investments.unshift(newInv);
  // }
}
