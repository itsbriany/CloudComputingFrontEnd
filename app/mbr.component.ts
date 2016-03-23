import {Component} from 'angular2/core';
import {MortgageApplication} from './models/mortgage-application';
import {MbrService} from "./services/mbr-service";
import {MBRInfo} from "./services/mbr-info";

@Component({
    selector: 'mbr-form',
    templateUrl: 'app/mbr.component.html',
    providers: [MbrService]
})
export class MbrComponent {
    active = true;
    submitted = false;
    loading = false;
    model = new MortgageApplication('bob', 10000);
    mbrInfo: MBRInfo;

    constructor(private _mbrService: MbrService) { }

    reset() {
        this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this._mbrService.getMbrInfoWithDelay().then(mbrInfo => this.receivedMbrInfo(mbrInfo));
    }

    private receivedMbrInfo(mbrInfo: MBRInfo) {
        this.loading = false;
        this.mbrInfo = mbrInfo;
        console.log('Done!');
    }

}