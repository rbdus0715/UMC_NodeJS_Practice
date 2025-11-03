export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

export default class User {
  id!: string;
  name!: string;
  gender!: GENDER;
  birth!: Date;
  email!: string;
  password!: string;
  profile_url!: string;
  location!: string;
  point!: number;
  verified!: boolean;
  notice_status!: boolean;
}
