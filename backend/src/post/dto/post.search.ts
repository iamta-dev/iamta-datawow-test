import { Prisma } from '@prisma/client';

export function createPostSearchCondition(fsearch?: string): {
  searchCondition: Prisma.PostWhereInput | undefined;
} {
  const search = fsearch?.trim() ?? '';

  // Return undefined if the search query is too short
  if (search.length < 2) {
    return { searchCondition: undefined };
  }

  const searchCondition: Prisma.PostWhereInput = {
    OR: [
      // Search for titles Case-insensitive condition
      { title: { contains: search, mode: 'insensitive' } },
      // TODO: Add more conditions if needed
    ],
  };

  return { searchCondition };
}
