export default class CreateUserMissionDto {
  user_id!: string;
  mission_id!: string;
  restaurant_id!: string;
  area_id!: string;
  status!: number;
  constructor(body: any) {
    this.user_id = body.user_id || '';
    this.mission_id = body.mission_id || '';
    this.restaurant_id = body.restaurant_id || '';
    this.area_id = body.area_id || '';
    this.status = 0;
  }
}
