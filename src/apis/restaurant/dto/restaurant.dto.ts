export class CreateRestaurantInput {
  area_id: string;
  name: string;
  phone_number: string;
  location: string;
  lat: number;
  lng: number;
  constructor(body: any) {
    this.area_id = body.area_id ?? '';
    this.name = body.name ?? '';
    this.phone_number = body.phone_number ?? '';
    this.location = body.location ?? '';
    this.lat = body.lat ?? 0;
    this.lng = body.lng;
  }
}
