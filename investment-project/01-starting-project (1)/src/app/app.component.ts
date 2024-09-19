import { Investment } from './models/investment';
import { Component,Input } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceListItemComponent } from './price-list-item/price-list-item.component';
import { InvServiceService } from './inv-service.service';
import { AnnualData } from './models/annualData';
import { InputFormComponent } from './input-form/input-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports:[HeaderComponent,PriceListComponent,PriceListItemComponent,InputFormComponent]
})
export class AppComponent {
  // @Input() investment!: Investment;
  constructor(private investmentService: InvServiceService){
    let storedAnnualData = localStorage.getItem('annualData');
    this.annualData = storedAnnualData?JSON.parse(storedAnnualData):[]
  }
  annualData: AnnualData[] = [];
  onSubmit(investment:Investment):void{
    this.annualData = this.investmentService.calculateInvestmentResults(investment)
    localStorage.setItem('annualData', JSON.stringify(this.annualData));
    console.log(JSON.stringify(this.annualData));
  }
  
}

