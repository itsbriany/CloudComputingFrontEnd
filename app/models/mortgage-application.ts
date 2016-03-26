/**
 * Created by itsbriany on 2016-03-22.
 */

export class MortgageApplication {
    applicantName: string;
    mortgageValue: number;
    houseID: number;
    mortgageID: string;
    
    constructor() {
        this.applicantName = '';
        this.mortgageValue = 0;
        this.houseID = 0;
    }
};