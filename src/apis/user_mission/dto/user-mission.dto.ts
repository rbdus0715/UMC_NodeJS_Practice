export class CreateUserMissionInput {
  user_id!: string;
  mission_id!: string;
  restaurant_id!: string;
  area_id!: string;
  status?: boolean; // 기본값은 false (미완료)

  constructor(
    user_id: string,
    mission_id: string,
    restaurant_id: string,
    area_id: string,
    status?: boolean
  ) {
    this.user_id = user_id;
    this.mission_id = mission_id;
    this.restaurant_id = restaurant_id;
    this.area_id = area_id;
    this.status = status ?? false;
  }
}

export class UpdateUserMissionStatusInput {
  status!: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
