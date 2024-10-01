import { createCommentUseCase } from "./create-comment.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import {
  type Comment,
  type CreateCommentDto,
} from "@/interfaces/services/comment.service.interface";
import { type createComment } from "@/interfaces/use-cases/comment.use-case.interface";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";

// Mock data
const mockComment: Comment = {
  id: 1,
  postId: 1,
  comment: "This is a test comment",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    pictureUrl: "https://example.com/profile.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const mockCreateCommentDto: CreateCommentDto = {
  postId: 1,
  comment: "This is a test comment",
};

// Unit test suite for createCommentUseCase
describe("createCommentUseCase", () => {
  let mockCreateComment: jest.MockedFunction<createComment>;
  let mockGetProfile: jest.MockedFunction<getProfile>;

  beforeEach(() => {
    mockCreateComment = jest.fn();
    mockGetProfile = jest.fn();
  });

  it("should create a comment successfully", async () => {
    // Mock getProfile to return a user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock createComment to return a successful response
    mockCreateComment.mockResolvedValueOnce({
      data: mockComment,
      error: undefined,
    });

    const result = await createCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        createComment: mockCreateComment,
      },
      data: mockCreateCommentDto,
    });

    expect(result).toEqual({ result: mockComment });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreateComment).toHaveBeenCalledWith(mockCreateCommentDto);
  });

  it("should return an error if user is not authenticated", async () => {
    // Mock getProfile to return null (user not authenticated)
    mockGetProfile.mockResolvedValueOnce(null);

    const result = await createCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        createComment: mockCreateComment,
      },
      data: mockCreateCommentDto,
    });

    expect(result).toEqual({
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreateComment).not.toHaveBeenCalled();
  });

  it("should handle errors from createComment API call", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock createComment to return an error response
    mockCreateComment.mockResolvedValueOnce({
      data: undefined,
      error: {
        error: undefined,
        message: "Error creating comment",
        statusCode: 500,
      } as any,
    });

    const result = await createCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        createComment: mockCreateComment,
      },
      data: mockCreateCommentDto,
    });

    expect(result).toEqual({
      error: {
        error: undefined,
        message: "Error creating comment",
        statusCode: 500,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreateComment).toHaveBeenCalledWith(mockCreateCommentDto);
  });
});
