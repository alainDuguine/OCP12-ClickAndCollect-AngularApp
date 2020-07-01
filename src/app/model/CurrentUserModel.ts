export class CurrentUserModel {
  id: number;
  mail: string;
  jwt: string;


  constructor(id: number, mail: string, jwt: string) {
    this.id = id;
    this.mail = mail;
    this.jwt = jwt;
  }
}
