import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';


import { RateReviewComponent } from './rate-review/rate-review.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import { RateReviewService } from './rate-review/shared/rate_review.service';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,        
        MatSelectModule,
        FormsModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
    ],
    declarations: [
        AppComponent,
       
        RateReviewComponent,
    ],
    providers: [
        
        DatePipe,
        RateReviewService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }