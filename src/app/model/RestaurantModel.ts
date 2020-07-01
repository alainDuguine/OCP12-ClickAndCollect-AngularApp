export class BusinessHour {
  startDay: number;
  endDay: number;
  startTime: string;
  endTime: string;
}

export class RestaurantModel {
  id: number;
  email: string;
  name: string;
  typeCuisine: string;
  description: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  businessHours: BusinessHour[];
  photo: string;
}
