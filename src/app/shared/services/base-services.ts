import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseServices<MODEL,SERVICE> {
    http  = inject(HttpClient);
    host : string = "http://localhost:3000";
    
    abstract endPoint : string;
    abstract mapDto(model : MODEL) : SERVICE;

    save(model : MODEL,id: string | number | null) : Observable<MODEL>{
        const endPoint = `${this.host}${this.endPoint}`;
        let newRequest : Observable<MODEL>;
        if(id) {
            newRequest = this.http.put<MODEL>(`${endPoint}/${id}`,this.mapDto(model));
        } else {
            newRequest = this.http.post<MODEL>(endPoint,this.mapDto(model));
        }
        return newRequest;
    }
    
    searchId(id : string | number) : Observable<MODEL>{
        const endPointSearch = `${this.host}${this.endPoint}/${id}`;
        const newRequest = this.http.get<MODEL>(endPointSearch);

        return newRequest as Observable<MODEL>;
    }

    search() : Observable<MODEL[]> {
        const endPointSearch = `${this.host}${this.endPoint}`
        const newRequest = this.http.get<MODEL>(endPointSearch);

        return newRequest as Observable<MODEL[]>;
    }
    delete(id: string | number) : Observable<MODEL> {
        const endPointSearch = `${this.host}${this.endPoint}/${id}`
        const newRequest = this.http.delete<MODEL>(endPointSearch);

        return newRequest as Observable<MODEL>;
  }
}
  
   