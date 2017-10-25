import { CustompizzaResolverService } from './custompizza-resolver/custompizza-resolver.service';
import { PizzaResolverService } from './pizza-resolver/pizza-resolver.service';
import { PizzaDataService } from './pizza-data/pizza-data.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { CustompizzaComponent } from './custompizza/custompizza.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzaRoutingModule } from './pizza-routing.module';
import { AllPizzaComponent } from './all-pizza/all-pizza.component';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { PizzaFilterPipe } from './pizza-filter/pizza-filter.pipe';
import { HighlightPizzaDirective } from './highlight-pizza/highlight-pizza.directive';

@NgModule({
    declarations: [
        CustompizzaComponent,
        AllPizzaComponent,
        PizzaDetailsComponent,
        PizzaFilterPipe,
        HighlightPizzaDirective,
    ],
    imports: [
        SharedModule,
        PizzaRoutingModule,
        FormsModule,
    ],
    providers: [
        PizzaDataService,
        PizzaResolverService,
        CustompizzaResolverService
    ]
})
export class PizzaModule { }
