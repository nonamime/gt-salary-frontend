import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@model/user';
import { map } from 'rxjs';
import { GetUsersParam } from '../dto/get-users-param';
import { GetUsersResponse } from '../dto/get-users-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  testCall() {
    return this.http.get('/users/1ssdf15').pipe(
      map(user => {
        return user
      })
    )
  }

  getUsers({ minSalary, maxSalary, order, offset }: GetUsersParam) {
    let params = new HttpParams()
      .set("minSalary", minSalary)
      .set("maxSalary", maxSalary)
      .set("order", order)
      .set("offset", offset);
    return this.http.get<GetUsersResponse>('/users', { params: params });
  }

  editUser(user: User) {
    return this.http.patch<HttpResponse<any>>('/users/' + user.id, user);
  }

  createUser(user: User) {
    return this.http.post<HttpResponse<any>>('/users', user);
  }

  deleteUser(id: string) {
    return this.http.delete<HttpResponse<any>>('/users/' + id);
  }



  // uploadUserCsv(multipartFile: Multipart) {
  //   let params = new HttpParams()
  //     .set("minSalary", minSalary)
  //     .set("maxSalary", maxSalary)
  //     .set("order", order)
  //     .set("offset", offset);
  //   return this.http.get<GetUsersResponse>('/users', { params: params });
  // }

}
