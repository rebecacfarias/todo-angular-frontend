import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  save(todo: Todo) : Observable<Todo> {
    return this.http.post<Todo>(this.apiURL, todo);
  }

  listAll() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  delete(id: number) : Observable<void>{
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url);
  }

  setAsDone(id: number) : Observable<Todo>{
    const url = `${this.apiURL}/${id}/done`;
    return this.http.patch<Todo>(url,{});
  }
}
