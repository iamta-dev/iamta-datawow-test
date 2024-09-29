/* eslint-disable @typescript-eslint/no-namespace */
export namespace PostSwagger {
  export const getPostById = {
    summary: 'Get post by ID',
    200: {
      status: 200,
      description: 'Post found',
      schema: {
        example: {
          id: 1,
          title: 'Sample Post Title',
          detail: 'Details of the sample post',
          userId: 1,
          communityId: 1,
          user: {
            id: 1,
            username: 'sampleuser',
            pictureUrl: 'https://example.com/user.jpg',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          community: {
            id: 1,
            name: 'Sample Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          comments: [
            {
              id: 1,
              comment: 'This is a sample comment',
              userId: 1,
              postId: 1,
              createdAt: '2024-08-14T05:00:00.000Z',
              updatedAt: '2024-08-14T05:00:00.000Z',
            },
          ],
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };

  export const getPosts = {
    summary: 'Get all posts',
    200: {
      status: 200,
      description: 'Posts fetched successfully',
      schema: {
        example: [
          {
            id: 1,
            title: 'Sample Post Title',
            detail: 'Details of the sample post',
            userId: 1,
            communityId: 1,
            user: {
              id: 1,
              username: 'sampleuser',
              pictureUrl: 'https://example.com/user.jpg',
              createdAt: '2024-08-14T04:44:34.066Z',
              updatedAt: '2024-08-14T04:44:34.066Z',
            },
            community: {
              id: 1,
              name: 'Sample Community',
              createdAt: '2024-08-14T04:44:34.066Z',
              updatedAt: '2024-08-14T04:44:34.066Z',
            },
            comments: [
              {
                id: 1,
                comment: 'This is a sample comment',
                userId: 1,
                postId: 1,
                createdAt: '2024-08-14T05:00:00.000Z',
                updatedAt: '2024-08-14T05:00:00.000Z',
              },
            ],
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          {
            id: 2,
            title: 'Another Post Title',
            detail: 'Details of another post',
            userId: 2,
            communityId: 2,
            user: {
              id: 2,
              username: 'anotheruser',
              pictureUrl: 'https://example.com/user2.jpg',
              createdAt: '2024-08-14T04:44:34.066Z',
              updatedAt: '2024-08-14T04:44:34.066Z',
            },
            community: {
              id: 2,
              name: 'Another Community',
              createdAt: '2024-08-14T04:44:34.066Z',
              updatedAt: '2024-08-14T04:44:34.066Z',
            },
            comments: [
              {
                id: 2,
                comment: 'This is another sample comment',
                userId: 2,
                postId: 2,
                createdAt: '2024-08-14T05:00:00.000Z',
                updatedAt: '2024-08-14T05:00:00.000Z',
              },
            ],
            createdAt: '2024-08-15T04:44:34.066Z',
            updatedAt: '2024-08-15T04:44:34.066Z',
          },
        ],
      },
    },
  };

  export const createPost = {
    summary: 'Create new post',
    201: {
      status: 201,
      description: 'Post created successfully',
      schema: {
        example: {
          id: 1,
          title: 'Sample Post Title',
          detail: 'Details of the sample post',
          userId: 1,
          communityId: 1,
          user: {
            id: 1,
            username: 'sampleuser',
            pictureUrl: 'https://example.com/user.jpg',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          community: {
            id: 1,
            name: 'Sample Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          comments: [],
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };

  export const updatePost = {
    summary: 'Update post by ID',
    200: {
      status: 200,
      description: 'Post updated successfully',
      schema: {
        example: {
          id: 1,
          title: 'Updated Post Title',
          detail: 'Updated details of the post',
          userId: 1,
          communityId: 1,
          user: {
            id: 1,
            username: 'sampleuser',
            pictureUrl: 'https://example.com/user.jpg',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          community: {
            id: 1,
            name: 'Sample Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          comments: [],
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };

  export const deletePost = {
    summary: 'Delete post by ID',
    200: {
      status: 200,
      description: 'Post deleted successfully',
      schema: {
        example: {
          id: 1,
          title: 'Sample Post Title',
          detail: 'Details of the sample post',
          userId: 1,
          communityId: 1,
          user: {
            id: 1,
            username: 'sampleuser',
            pictureUrl: 'https://example.com/user.jpg',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          community: {
            id: 1,
            name: 'Sample Community',
            createdAt: '2024-08-14T04:44:34.066Z',
            updatedAt: '2024-08-14T04:44:34.066Z',
          },
          comments: [],
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
        },
      },
    },
  };
}
