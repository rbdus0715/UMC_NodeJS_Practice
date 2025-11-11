import { Prisma } from '@prisma/client';

export const userMissionSelect = {
  user_id: true,
  mission_id: true,
  restaurant_id: true,
  area_id: true,
  status: true,
} satisfies Prisma.user_missionSelect;

export type UserMissionRecord = Prisma.user_missionGetPayload<{
  select: typeof userMissionSelect;
}>;

