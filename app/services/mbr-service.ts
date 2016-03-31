import {Injectable} from "angular2/core";
import {Http, Headers, Response, RequestOptions} from "angular2/http";
import {MortgageApplication} from "../models/mortgage-application";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MbrService {
    constructor(private http: Http) { }

    private mortgageApplicationUrl = 'http://ec2-52-91-177-77.compute-1.amazonaws.com/api/MortgageApplications';
    // private mortgageApplicationUrl = 'http://ec2-52-91-177-77.compute-1.amazonaws.com/api/DoAnError@!@!@';

    
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
            .catch(MbrService.handleError);  // Catch the error.
    }

    getMortgageApplicantNames() {
        return this.http.get(this.mortgageApplicationUrl)
            .flatMap(res => {
                let mortgageApplications = Observable.fromArray(res.json());
                return this.getMortgageApplication(mortgageApplications);
            });
    }

    getMortgageApplicationById(mortgageID: string): Observable<MortgageApplication> {
        let getMortgageApplicationUrl = `${this.mortgageApplicationUrl}/${mortgageID}`;
        return this.http.get(getMortgageApplicationUrl)
            .map(res => res.json())
            .catch(err => MbrService.handleError(err));
    }

    // FlatMap is like map, except that is must return an Observable of Observables to flatten

    // Not the most efficient way to solve the problem, but this was done for the sake
    // of learning observables and chaining HTTP requests
    getMortgageApplication(mortgageApplications: Observable<MortgageApplication>) {
        return mortgageApplications.flatMap(mortgageApplication => {
            return this.getMortgageApplicationById(mortgageApplication.mortgageID);
        })
        .reduce((acc, curr: MortgageApplication) => {
            acc.push(curr.applicantName);
            return acc;
        },[]);
    }
    
    addMortgageApplication(mortgageApplication: MortgageApplication): Observable<MortgageApplication> {
        let body = JSON.stringify(mortgageApplication);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.mortgageApplicationUrl, body, options)
            .map(res => <MortgageApplication> res.json())
            .do(data => console.log(`Mapped data: ${JSON.stringify(data)}`))
            .catch(MbrService.handleError);
    }

    private static handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}