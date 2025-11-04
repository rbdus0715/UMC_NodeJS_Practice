export class CreateMissionDto {
  id!: string;
  restaurant_id!: string;
  area_id!: string;
  content!: string;
  price!: number;
  point!: number;
  deadline!: Date;
  constructor(body: any) {
    this.restaurant_id = body.restaurant_id || '';
    this.area_id = body.area_id || '';
    this.content = body.content || '';
    this.price = body.price || 10000;
    this.point = body.point || 0;
    this.deadline = body.deadline;
  }
}
