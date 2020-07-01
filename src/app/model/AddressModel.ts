export class AddressModel {
  private latitude: string;
  private longitude: string;
  private formattedAddress: string;

  constructor(latitude: string, longitude: string, formattedAddress: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.formattedAddress = formattedAddress;
  }
}
