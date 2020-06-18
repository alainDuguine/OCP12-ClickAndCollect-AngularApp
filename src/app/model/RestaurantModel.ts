class OpeningHour {
}

export class RestaurantModel {
  id: number;
  email: string;
  name: string;
  typeCuisine: string;
  description: string;
  imageUrl: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  openingHours: OpeningHour[];
}
