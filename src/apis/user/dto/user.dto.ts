import { GENDER } from '../entities/user.entity';

export class CreateUserInput {
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
    constructor(
        name: string,
        gender: GENDER,
        birth: Date,
        email: string,
        password: string,
        profile_url: string,
        location: string,
        point: number,
        verified: boolean,
        notice_status: boolean
    ) {
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.email = email;
        this.password = password;
        this.profile_url = profile_url;
        this.location = location;
        this.point = point;
        this.verified = verified;
        this.notice_status = notice_status;
    }
}
