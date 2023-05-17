import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApiResponse, GithubFilter } from './github-filter';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  readonly url = "https://api.github.com/search/users";

  constructor(private http: HttpClient) { }

  public fetchUsers(per_page: number, page: number, filter?: GithubFilter): Observable<GithubApiResponse> {
    let params: any = {per_page, page}
    if(filter) {
      const {
        q,
        ...rest
      } = filter;
      const criterias1: string[] = q ? [q] : ["a"]
      Object.entries(rest)
      .filter(([k, v]) => v)
      .map(([k, v]) => {
        criterias1.push(`${k}=${v}`)
      })
      params.q = criterias1.join(" ") 
    }
    
    
    return this.http.get<GithubApiResponse>(this.url, {params, headers: this.getHeaders()})
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append("accept", "application/vnd.github+json");
    headers.append("X-GitHub-Api-Version", "2022-11-28");
    headers.append("Authorization", "Bearer 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");

    return headers;
  }
}
