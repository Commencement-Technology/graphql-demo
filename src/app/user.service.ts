import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          query {
            users {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result: any) => result.data.users));
  }

  createUser(name: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($name: String!, $email: String!) {
          createUser(name: $name, email: $email) {
            id
            name
            email
          }
        }
      `,
      variables: {
        name: name,
        email: email,
      },
    }).pipe(map((result: any) => result.data.createUser));
  }
}
