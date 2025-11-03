export class CreateMissionInput {
  id!: string;
  restaurant_id!: string;
  area_id!: string;
  content!: string;
  price!: number;
  point!: number;
  deadline!: Date;
  constructor(
    restaurant_id: string,
    area_id: string,
    content: string,
    price: number,
    point: number,
    deadline: Date
  ) {
    this.restaurant_id = restaurant_id;
    this.area_id = area_id;
    this.content = content;
    this.price = price;
    this.point = point;
    this.deadline = deadline;
  }
}
