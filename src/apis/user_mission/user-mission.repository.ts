import { Pool, RowDataPacket } from 'mysql2/promise';
import UserMission from './entities/user-mission.entity';
import {
  CreateUserMissionInput,
  UpdateUserMissionStatusInput,
} from './dto/user-mission.dto';

export default class UserMissionRepository {
  constructor(private readonly pool: Pool) {}

  async create(data: CreateUserMissionInput): Promise<UserMission> {
    const query_string =
      'INSERT INTO user_mission (user_id, mission_id, restaurant_id, area_id, status) VALUES (?, ?, ?, ?, ?)';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      data.user_id,
      data.mission_id,
      data.restaurant_id,
      data.area_id,
      data.status ?? false,
    ]);

    return this.findByUserAndMission({
      user_id: data.user_id,
      mission_id: data.mission_id,
    }) as Promise<UserMission>;
  }

  async findByUserId({ user_id }: { user_id: string }): Promise<UserMission[]> {
    const query_string = 'SELECT * FROM user_mission WHERE user_id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      user_id,
    ]);
    return rows as UserMission[];
  }

  async findByMissionId({
    mission_id,
  }: {
    mission_id: string;
  }): Promise<UserMission[]> {
    const query_string = 'SELECT * FROM user_mission WHERE mission_id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      mission_id,
    ]);
    return rows as UserMission[];
  }

  async findByUserAndMission({
    user_id,
    mission_id,
  }: {
    user_id: string;
    mission_id: string;
  }): Promise<UserMission | null> {
    const query_string =
      'SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      user_id,
      mission_id,
    ]);
    const result = rows as UserMission[];
    return result.length > 0 ? result[0] : null;
  }

  async updateStatus({
    user_id,
    mission_id,
    data,
  }: {
    user_id: string;
    mission_id: string;
    data: UpdateUserMissionStatusInput;
  }): Promise<UserMission> {
    const query_string =
      'UPDATE user_mission SET status = ? WHERE user_id = ? AND mission_id = ?';
    await this.pool.query<RowDataPacket[]>(query_string, [
      data.status,
      user_id,
      mission_id,
    ]);

    return this.findByUserAndMission({
      user_id,
      mission_id,
    }) as Promise<UserMission>;
  }

  async delete({
    user_id,
    mission_id,
  }: {
    user_id: string;
    mission_id: string;
  }): Promise<void> {
    const query_string =
      'DELETE FROM user_mission WHERE user_id = ? AND mission_id = ?';
    await this.pool.query<RowDataPacket[]>(query_string, [user_id, mission_id]);
  }

  // JOIN을 사용하여 User와 Mission 정보를 함께 가져오기
  async findUserMissionsWithDetails({
    user_id,
  }: {
    user_id: string;
  }): Promise<any[]> {
    const query_string = `
            SELECT 
                um.user_id,
                um.mission_id,
                um.restaurant_id,
                um.area_id,
                um.status,
                u.name as user_name,
                u.email as user_email,
                m.content as mission_content,
                m.point as mission_point,
                m.deadline as mission_deadline
            FROM user_mission um
            INNER JOIN user u ON um.user_id = u.id
            INNER JOIN mission m ON um.mission_id = m.id
            WHERE um.user_id = ?
        `;
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      user_id,
    ]);
    return rows as any[];
  }

  async findMissionUsersWithDetails({
    mission_id,
  }: {
    mission_id: string;
  }): Promise<UserMission[]> {
    const query_string = `
            SELECT 
                um.user_id,
                um.mission_id,
                um.restaurant_id,
                um.area_id,
                um.status,
                u.name as user_name,
                u.email as user_email,
                u.profile_url as user_profile_url,
                m.content as mission_content,
                m.point as mission_point
            FROM user_mission um
            INNER JOIN user u ON um.user_id = u.id
            INNER JOIN mission m ON um.mission_id = m.id
            WHERE um.mission_id = ?
        `;
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string, [
      mission_id,
    ]);
    return rows as UserMission[];
  }

  async findAll(): Promise<UserMission[]> {
    const query_string = 'SELECT * FROM user_mission';
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as UserMission[];
  }

  async findAllWithDetails(): Promise<UserMission[]> {
    const query_string = `
            SELECT 
                um.user_id,
                um.mission_id,
                um.restaurant_id,
                um.area_id,
                um.status,
                u.name as user_name,
                u.email as user_email,
                u.profile_url as user_profile_url,
                m.content as mission_content,
                m.point as mission_point,
                m.deadline as mission_deadline
            FROM user_mission um
            INNER JOIN user u ON um.user_id = u.id
            INNER JOIN mission m ON um.mission_id = m.id
            ORDER BY um.user_id, um.mission_id
        `;
    const [rows] = await this.pool.query<RowDataPacket[]>(query_string);
    return rows as UserMission[];
  }
}
