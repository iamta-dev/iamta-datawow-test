/* eslint-disable @typescript-eslint/no-namespace */
export namespace CommunitySwagger {
  export const getCommunities = {
    summary: 'Get all communities',
    200: {
      status: 200,
      description: 'Communities fetched successfully',
      schema: {
        example: [
          {
            id: 1,
            name: 'Healthy Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          {
            id: 2,
            name: 'Fitness Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
        ],
      },
    },
  };
}
