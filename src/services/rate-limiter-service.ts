import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RateLimiterService
{
    private apiUrl = 'https://localhost:7215/api/Message/'; // Replace with actual API URL

    constructor(private http: HttpClient) {}
  
    getAccountLogsPerTime(): Observable<Number> {      
      return this.http.get<Number>(this.apiUrl + "status/accountlog");
    }
    getPhoneLogsPerTime(phone: string): Observable<Number> {
        return this.http.get<Number>(`${this.apiUrl}status/phonelog/${phone}`);
    }  
    GetPhoneLogsByDate(phone: string, from: string, to: string): Observable<Number> {
        return this.http.get<Number>(`${this.apiUrl}status/phonelog/${phone}/${from}/${to}`);
    }  

}