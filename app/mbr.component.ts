import {Component} from 'angular2/core';
import {MortgageApplication} from './models/mortgage-application';
import {MbrService} from "./services/mbr-service";

@Component({
    selector: 'mbr-form',
    templateUrl: 'app/mbr.component.html',
    providers: [MbrService]
})
export class MbrComponent {
    active = true;
    submitted = false;
    loading = false;
    currentMortgageApplication = new MortgageApplication();
    errorMessage: string;
    mortgageID: string;

    constructor(private mbrService: MbrService) { }

    reset() {
        this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.postMortgageApplication();
        // this.mbrService.getMbrMockInfoWithDelay().then(mbrInfo => this.receivedMbrInfo(mbrInfo));
    }

    private getMortgageApplications() {
        this.mbrService.getMortgageApplications()
            .subscribe(mortgageApplication => 
                console.log(`Done, here are the mortgageApplications: ${JSON.stringify(mortgageApplication)}`,
                error => this.onReceiveMortgageApplicationError(error)));
    }

    private postMortgageApplication() {
        this.mbrService.addMortgageApplication(this.currentMortgageApplication)
            .subscribe(
                mortgageApplication => this.onReceiveMortgageApplication(mortgageApplication),
                error => this.onReceiveMortgageApplicationError(error)
            );
    }

    private onReceiveMortgageApplication(mortgageApplication: MortgageApplication) {
        this.mortgageID = mortgageApplication.mortgageID;
        this.loading = false;
    }

    private onReceiveMortgageApplicationError(error: Error) {
        this.errorMessage = error.message;
        this.loading = false;
    }

}