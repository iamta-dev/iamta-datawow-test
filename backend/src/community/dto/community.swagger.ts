/* eslint-disable @typescript-eslint/no-namespace */
export namespace CommunitySwagger {
  export const getCommunityById = {
    summary: 'Get community by ID',
    200: {
      status: 200,
      description: 'Community found',
      schema: {
        example: {
          id: 1,
          name: 'Healthy Community',
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };

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

  export const createCommunity = {
    summary: 'Create new community',
    201: {
      status: 201,
      description: 'Community created successfully',
      schema: {
        example: {
          id: 1,
          name: 'Healthy Community',
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };

  export const updateCommunity = {
    summary: 'Update community by ID',
    200: {
      status: 200,
      description: 'Community updated successfully',
      schema: {
        example: {
          id: 1,
          name: 'Updated Community',
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-15T04:44:34.066Z',
        },
      },
    },
  };

  export const deleteCommunity = {
    summary: 'Delete community by ID',
    200: {
      status: 200,
      description: 'Community deleted successfully',
      schema: {
        example: {
          id: 1,
          name: 'Healthy Community',
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };
}
