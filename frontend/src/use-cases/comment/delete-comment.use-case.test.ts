import { deleteCommentUseCase } from "./delete-comment.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { type Comment } from "@/interfaces/services/comment.service.interface";
import { type deleteComment } from "@/interfaces/use-cases/comment.use-case.interface";
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

// Unit test suite for deleteCommentUseCase
describe("deleteCommentUseCase", () => {
  let mockDeleteComment: jest.MockedFunction<deleteComment>;
  let mockGetProfile: jest.MockedFunction<getProfile>;

  beforeEach(() => {
    mockDeleteComment = jest.fn();
    mockGetProfile = jest.fn();
  });

  it("should delete a comment successfully", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock deleteComment to return a successful response
    mockDeleteComment.mockResolvedValueOnce({
      data: mockComment,
      error: undefined,
    });

    const result = await deleteCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        deleteComment: mockDeleteComment,
      },
      id: 1,
    });

    expect(result).toEqual({ result: mockComment });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockDeleteComment).toHaveBeenCalledWith(1);
  });

  it("should return an error if user is not authenticated", async () => {
    // Mock getProfile to return null (user not authenticated)
    mockGetProfile.mockResolvedValueOnce(null);

    const result = await deleteCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        deleteComment: mockDeleteComment,
      },
      id: 1,
    });

    expect(result).toEqual({
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockDeleteComment).not.toHaveBeenCalled();
  });

  it("should handle errors from deleteComment API call", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock deleteComment to return an error response
    mockDeleteComment.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error deleting comment",
        statusCode: 500,
      } as any,
    });

    const result = await deleteCommentUseCase({
      context: {
        getProfile: mockGetProfile,
        deleteComment: mockDeleteComment,
      },
      id: 1,
    });

    expect(result).toEqual({
      error: {
        message: "Error deleting comment",
        statusCode: 500,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockDeleteComment).toHaveBeenCalledWith(1);
  });
});
