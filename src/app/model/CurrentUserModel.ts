export class CurrentUserModel {
  id: number;
  jwt: string;

  constructor(id: number, jwt: string) {
    this.id = id;
    this.jwt = jwt;
  }
}
