/**
 * Created by itsbriany on 2016-03-30.
 */

import {Component} from 'angular2/core';
import {MortgageApplication} from './models/mortgage-application';
import {MbrService} from "./services/mbr-service";

@Component({
    templateUrl: 'app/status.component.html',
    styleUrls: ['app/status.component.css']
})
export class StatusComponent {
    //TODO: This state stuff could be refactored into its own component
    active = true;
    loading = false;
    submitted = false;
    currentMortgageApplication = new MortgageApplication();
    errorMessage: string;

    constructor(private mbrService: MbrService) {}

    onSubmit() {
        this.errorMessage = '';
        this.loading = true;
        this.submitted = true;
        this.mbrService.getMortgageApplicationById(this.currentMortgageApplication.mortgageID)
            .subscribe(
                (mortgageApplication: MortgageApplication) => {
                    this.loading = false;
                    this.currentMortgageApplication = mortgageApplication;
                    console.log(JSON.stringify(this.currentMortgageApplication));
                },
                (error: Error) => {
                    this.loading = false;
                    this.errorMessage = error.message;
                }
            );
    }
}