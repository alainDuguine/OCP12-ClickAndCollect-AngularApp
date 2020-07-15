export class CurrentUserModel {
  id: number;
  email: string;
  jwt: string;


  constructor(id: number, email: string, jwt: string) {
    this.id = id;
    this.email = email;
    this.jwt = jwt;
  }
}
