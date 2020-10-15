import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {

  constructor(private http: HttpClient) { }
  getScrappedData(url){
  
   
    return this.http.get("http://localhost:56097/api/values/scrapData?url=" + url);
    
  }
}
