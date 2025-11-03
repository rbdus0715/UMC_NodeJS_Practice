export class CreateRestaurantInput {
  area_id: string;
  name: string;
  phone_number: string;
  location: string;
  lat: number;
  lng: number;
  constructor(
    area_id: string,
    name: string,
    phone_number: string,
    location: string,
    lat: number,
    lng: number
  ) {
    this.area_id = area_id;
    this.name = name;
    this.phone_number = phone_number;
    this.location = location;
    this.lat = lat;
    this.lng = lng;
  }
}
