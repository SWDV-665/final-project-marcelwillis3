import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*
  Generated class for the PCBuildServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PCBuildServiceProvider {

  components = <any>[];
  dataChanged$: Observable<boolean>;
  baseURL = "https://pc-builder-advisor.herokuapp.com"
  
  private dataChangedSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello PCBuildServiceProvider Provider');

    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  getComponents(): Observable<object[]>{
    return this.http.get(this.baseURL + "/api/pccomponents").pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error("A client-side or network error occurred: ", error.error.message);
    } else{
      console.error(`Backend returned code: ${error.status}, ` + `body was: ${error.error}`);
    }
    return Observable.throw("Oops! Something went bad. See console message for details.");
  }

  removeComponent(id){
    console.log("Removing Component - id = ", id);
    this.http.delete(this.baseURL + "/api/pccomponents/" + id).subscribe(res => {
      this.components = res;
      this.dataChangedSubject.next(true)
    });
  }

  addComponent(component){
    this.http.post(this.baseURL + "/api/pccomponents/", component).subscribe(res => {
      this.components = res;
      this.dataChangedSubject.next(true)
    });
  }

  editComponent(component, index){
    this.http.put(this.baseURL + "/api/pccomponents/" + component._id, component).subscribe(res => {
      this.components = res;
      this.dataChangedSubject.next(true);
    })
  }

}
