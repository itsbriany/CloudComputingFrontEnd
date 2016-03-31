/**
 * Created by itsbriany on 2016-03-22.
 */

import {Employment} from "./employment";
import {InsuranceQuote} from "./insurance-quote";

export class MortgageApplication {
    applicantName: string;
    mortgageValue: number;
    houseID: number;
    mortgageID: string;
    employment: Employment;
    insuranceQuote: InsuranceQuote;
    
    constructor() {
        this.applicantName = '';
        this.mortgageValue = 0;
        this.houseID = 0;
        this.employment = new Employment(0, '');
        this.insuranceQuote = new InsuranceQuote(0, 0);
    }
}