import { type Games, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MAX_RECORDS = 50;
const MIN_OFFSET = 0;

const Games = {
  getOne: async ({
    where,
  }: {
    where: Pick<Games, "slug"> | Pick<Games, "id">;
  }) => {
    return await prisma.games.findUnique({ where });
  },

  get: async ({ where = {}, orderBy = {}, limit = 10, offset = 0 }) => {
    const take = Math.min(limit, MAX_RECORDS);
    const skip = Math.max(offset, MIN_OFFSET);

    const records = await prisma.games.findMany({
      where,
      orderBy,
      take,
      skip,
    });

    return records;
  },

  count: async ({ where = {} }) => {
    return await prisma.games.count({
      where,
    });
  },
};

export default Games;
