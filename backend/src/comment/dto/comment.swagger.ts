/* eslint-disable @typescript-eslint/no-namespace */
export namespace CommentSwagger {
  export const getCommentById = {
    summary: 'Get comment by ID',
    200: {
      status: 200,
      description: 'Comment found',
      schema: {
        example: {
          id: 1,
          comment: 'This is a comment',
          userId: 1,
          postId: 1,
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
          user: {
            id: 1,
            username: 'testuser',
            pictureUrl: 'https://example.com/user.jpg',
          },
        },
      },
    },
  };

  export const createComment = {
    summary: 'Create new comment',
    201: {
      status: 201,
      description: 'Comment created successfully',
      schema: {
        example: {
          id: 1,
          comment: 'This is a comment',
          userId: 1,
          postId: 1,
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
          user: {
            id: 1,
            username: 'testuser',
            pictureUrl: 'https://example.com/user.jpg',
          },
        },
      },
    },
  };

  export const updateComment = {
    summary: 'Update comment by ID',
    200: {
      status: 200,
      description: 'Comment updated successfully',
      schema: {
        example: {
          id: 1,
          comment: 'Updated comment',
          userId: 1,
          postId: 1,
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-15T04:44:34.066Z',
          user: {
            id: 1,
            username: 'testuser',
            pictureUrl: 'https://example.com/user.jpg',
          },
        },
      },
    },
  };

  export const deleteComment = {
    summary: 'Delete comment by ID',
    200: {
      status: 200,
      description: 'Comment deleted successfully',
      schema: {
        example: {
          id: 1,
          comment: 'This is a comment',
          userId: 1,
          postId: 1,
          createdAt: '2024-08-14T04:44:34.066Z',
          updatedAt: '2024-08-14T04:44:34.066Z',
          user: {
            id: 1,
            username: 'testuser',
            pictureUrl: 'https://example.com/user.jpg',
          },
        },
      },
    },
  };
}
