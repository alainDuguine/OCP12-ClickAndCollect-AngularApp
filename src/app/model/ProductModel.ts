export class ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: number;

  constructor(id: number, name: string, description: string, price: number, imageUrl: string, category: string, restaurantId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.restaurantId = restaurantId;
  }
}
