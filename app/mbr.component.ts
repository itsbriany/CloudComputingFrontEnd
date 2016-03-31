import {Component} from 'angular2/core';
import {MortgageApplication} from './models/mortgage-application';
import {MbrService} from "./services/mbr-service";

@Component({
    selector: 'mbr-form',
    templateUrl: 'app/mbr.component.html'
})
export class MbrComponent {
    active = true;
    submitted = false;
    loading = false;
    currentMortgageApplication = new MortgageApplication();
    errorMessage: string;
    mortgageID: string;
    linkToEMPPortal = "http://ec2-54-186-177-165.us-west-2.compute.amazonaws.com:3000/";

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

    private getMortgageApplicantNames() {
        this.mbrService.getMortgageApplicantNames()
            .subscribe(
                applicantNames => console.log(`Got ApplicantNames: ${JSON.stringify(applicantNames)}`,
                error => this.onReceiveMortgageApplicationError(error)
                ));
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