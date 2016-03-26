import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptions} from "angular2/http";
import {MortgageApplication} from "../models/mortgage-application";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MbrService {
    constructor(private http: Http) { }

    private mortgageApplicationUrl = 'http://localhost:3000/api/MortgageApplications';
    // private mortgageApplicationUrl = 'http://localhost:3000/api/DoAnError@!@!@';



    getMbrMockInfoWithDelay() {
        let mortgageApplication = new MortgageApplication();
        return new Promise<MortgageApplication>(resolve =>
            setTimeout(() => resolve(mortgageApplication), 1000)
        );
    }
    
    getMortgageApplications() {
        return this.http.get(this.mortgageApplicationUrl)
            .map(res => <MortgageApplication[]> res.json()) // Map the data from each incoming response to the subscription
            .do(data => console.log(`Data: ${data}`)) // You can check the data that was previously mapped with do
            .catch(this.handleError);  // Catch the error.
    }
    
    addMortgageApplication(mortgageApplication: MortgageApplication): Observable<MortgageApplication> {
        let body = JSON.stringify(mortgageApplication);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.mortgageApplicationUrl, body, options)
            .map(res => <MortgageApplication> res.json())
            .do(data => console.log(`Mapped data: ${JSON.stringify(data)}`))
            .catch(this.handleError);
    }
    
    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}