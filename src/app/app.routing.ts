import { Routes, RouterModule } from '@angular/router';
import { RateReviewComponent } from './rate-review/rate-review.component';



const appRoutes: Routes = [

    { path: 'rate-review', component: RateReviewComponent },

   
    // otherwise redirect to home
    { path: 'rate-review', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);