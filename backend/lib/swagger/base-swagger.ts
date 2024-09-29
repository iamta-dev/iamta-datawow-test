/* eslint-disable prettier/prettier */
export const SwaggerBaseResponse = {
  401: {
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  },
  404: {
    status: 404,
    description: 'Not found',
    schema: {
      example: {
        message: 'Resource not found',
        statusCode: 404,
      },
    },
  },
  400: {
    status: 400,
    description: 'Bad Request',
    schema: {
      example: {
        message: ['field validate failed.'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  },
  500: {
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        message: 'Internal server error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  },
};
