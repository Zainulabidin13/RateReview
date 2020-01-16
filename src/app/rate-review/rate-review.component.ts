import { Component, OnInit, ViewChild } from "@angular/core";
import { RateView } from "./shared/rate_review.model";
import { DatePipe } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VALID } from "@angular/forms/src/model";
import swal from "sweetalert";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { RateReviewService } from "./shared/rate_review.service";
import { ValidatorClass } from "./shared/validate.component";
export interface Animal {
    name: string;
    sound: string;
  }

@Component({
    selector: 'app-rate-review',
    templateUrl: './rate-review.component.html',
    styleUrls: ['./rate-review.component.css'],
})
export class RateReviewComponent extends ValidatorClass implements OnInit {
    displayedColumns: string[] =
     ['i', 'description', 'sicCode'
    ,'totalVolume','totalTransaction','avgTicket','action'];
    dataSource: MatTableDataSource<RateView>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    RateViewForm: FormGroup;
    animals: Animal[] = [
        {name: 'Dog', sound: 'Woof!'},
        {name: 'Cat', sound: 'Meow!'},
        {name: 'Cow', sound: 'Moo!'},
        {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
      ];
    vacations: RateView[];
    vacation: RateView;
    isEdit: boolean = false;
    managerApproval: boolean = false;
    submitted :boolean= false;
    constructor(
        public formBuilder: FormBuilder,
        public datePipe: DatePipe,
        private rateReviewService:RateReviewService ) {
            super() }

    ngOnInit() {
        ////// For Drop With Service
//        this.yourService.getFunction().subscribe(object=>this.model=object)
        ////////
        this.rateReviewService.getRateReviews().subscribe(RateView => {
            this.dataSource = new MatTableDataSource<any>(RateView);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator  = this.paginator ;
        })
      
        this.isEdit = false;
        this.RateViewForm = this.formBuilder.group({
            id: [''],
            description: ['',[Validators.required,this.StringMaxLength(20)]], //in This Input Only 30 digits
            sicCode: [''],
            visaOldValue: ['',[this.NumberMaxLength(5)]], //only 5 Digit Allow in Input
            visaCurrentValue: ['',[this.NumberMaxValue(100)]],// in this number not exceed from 100
            masterCardOldValue: ['',[this.NumberNegativeCheck]], // in this Number Negative Not Enter in input
            masterCardCurrentValue: ['',[this.StringMaxLength(30)]],
            debitCardOldValue: ['',[this.StringMaxLength(30)]],
            debitCardCurrentValue: ['',[this.StringMaxLength(30)]],
            hblOldValue: ['',[this.StringMaxLength(30)]],
            hblCurrentValue: ['',[]],
            totalVolume: ['',[Validators.required,this.StringMaxLength(30)]],
            totalTransaction: ['',[Validators.required,this.StringMaxLength(30)]],
            avgTicket: ['',[Validators.required,this.StringMaxLength(30)]],
            currentRate: ['',[Validators.required,this.StringMaxLength(30)]],
            currentAmexFees: ['',[Validators.required,this.StringMaxLength(30)]],
        })
    }
    employeeDelete(id: number) {
        this.rateReviewService.deleteRateReview(id).subscribe((response => {

            swal({
                // position: 'top-end',
                //   type: response['type'],
                text: "Successfully Delete Row",
                icon: "success",
                title: 'Delete Success',
                timer: 1500
            })
            if (response['type'] == 'success')
                this.ngOnInit();
        }))
    }
    Edit(id) {
        this.rateReviewService.getRateReview(id).subscribe(val => {
            this.isEdit = true;
            this.patchRateView(val);
        })
    }

    patchRateView(val: RateView) {
        this.RateViewForm.patchValue({
            id: val.id,
            description: val.description,
            sicCode: val.sicCode,
            visaOldValue: val.visaOldValue,
            visaCurrentValue: val.visaCurrentValue,
            masterCardOldValue: val.masterCardOldValue,
            masterCardCurrentValue: val.masterCardCurrentValue,
            debitCardOldValue: val.debitCardOldValue,
            debitCardCurrentValue: val.debitCardCurrentValue,
            hblOldValue: val.hblOldValue,
            hblCurrentValue: val.hblCurrentValue,
            totalVolume: val.totalVolume,
            totalTransaction: val.totalTransaction,
            avgTicket: val.avgTicket,
            currentRate: val.currentRate,
            currentAmexFees: val.currentAmexFees,
        })
      
    }

    cancel() {
        this.RateViewForm.reset();
    }
    createAndUpdate(data) {
        debugger;
        if (this.RateViewForm.dirty  && this.RateViewForm.valid) {
        if ( this.isEdit) {
            this.rateReviewService.UpdateRateReview(data, data.id)
                .subscribe((response => {
                    swal({
                        text: "Successfully Update Row",
                        icon: "success",
                        title: 'Update Success',
                        timer: 1500
                    })
                    if (response['type'] == 'success')
                        this.ngOnInit();
                }));
        }
        else {



            this.rateReviewService.addRateReview(data)
                .subscribe((response => {
                    swal({
                        text: "Successfully Create Row",
                        icon: "success",
                        title: 'Create Success',
                        timer: 1500
                    })

                }));
        }
    }
    }


}