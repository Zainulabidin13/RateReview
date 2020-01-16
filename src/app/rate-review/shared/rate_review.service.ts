import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RateView } from "./rate_review.model";

const headerOpt=
{
    headers: new HttpHeaders ({'Content-Type':'application/json'})
};
@Injectable()
export class RateReviewService {
TestUrl='http://localhost:3000/RateView';
currentRateReview:RateView={
    id:null,
    description:'',
    sicCode:'',
    visaOldValue:null,
    visaCurrentValue:null,
    masterCardOldValue:null,
    masterCardCurrentValue:null,
    debitCardOldValue:null,
    debitCardCurrentValue:null,
    hblOldValue:null,
    hblCurrentValue:null,
    totalVolume:null,
    totalTransaction:null,
    avgTicket:null,
    currentRate:null,
    currentAmexFees:null,
}

    constructor(public http:HttpClient){

    }
    getRateReviews():Observable<RateView[]>{
        return this.http.get<RateView[]>(this.TestUrl,headerOpt)
    }
    getRateReview(id: number): Observable<RateView> {
        return this.http.get<RateView>(this.TestUrl+'/'+id);
      }
    deleteRateReview(id:number):Observable<RateView>{
        return this.http.delete<RateView>(this.TestUrl+'/'+id,headerOpt)
    }
    addRateReview(RateReviewToAdd: RateView):Observable<RateView> {
        return this.http.post<RateView>(this.TestUrl, RateReviewToAdd,
            { headers: { 'Content-Type': 'application/json' } } );
      }
    UpdateRateReview(RateReviewToAdd: RateView,id:number):Observable<RateView> {
        return this.http.put<RateView>(this.TestUrl+'/'+id, RateReviewToAdd,
            { headers: { 'Content-Type': 'application/json' } } );
      }

}