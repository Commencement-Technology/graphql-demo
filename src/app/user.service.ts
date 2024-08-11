import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private PATH = "/graphql";
  private HOST = "http://localhost:4000";
  private fullUrl = this.HOST + this.PATH;

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
        context: {
          uri: this.fullUrl,
        },
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
      context: {
        uri: this.fullUrl,
      },
      variables: {
        name: name,
        email: email,
      },
    }).pipe(map((result: any) => result.data.createUser));
  }
}
