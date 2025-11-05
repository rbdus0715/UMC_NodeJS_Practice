export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

export class CreateUserDto {
  id!: string;
  name!: string;
  gender!: GENDER;
  birth!: Date;
  email!: string;
  nickname: string; // 필수
  password: string; // 필수
  profile_url!: string;
  location!: string;
  point!: number;
  verified!: number;
  notice_status!: number;
  // created_at: 생성 시각을 default로 세팅함
  deleted_at!: Date | null;
  constructor(body: any) {
    this.name = body.name || '';
    this.gender = body.gender || GENDER.NONE;
    this.birth = body.birth;
    this.email = body.email || '';
    this.nickname = body.nickname;
    this.password = body.password;
    this.profile_url = body.profile_url || '';
    this.location = body.location || '';
    this.point = body.point || 0;
    this.verified = body.point || false;
    this.notice_status = body.notice_status || false;
    this.deleted_at = null;
  }
}
