/**
 * Created by itsbriany on 2016-03-30.
 */

export class InsuranceQuote {
    deductibleValue: number;
    insuredValue: number;

    constructor(deductibleValue: number, insuredValue: number) {
        this.deductibleValue = deductibleValue;
        this.insuredValue = insuredValue;
    }
}