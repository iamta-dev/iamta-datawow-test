import { deletePostUseCase } from "./delete-post.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import { type Post } from "@/interfaces/services/post.service.interface";
import { type deletePost } from "@/interfaces/use-cases/post.use-case.interface";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";
import { baseUseCaseHandleResponse } from "../base/base.use-case";

// Mock data
const mockPost: Post = {
  id: 1,
  title: "Test Post",
  detail: "This is a test post",
  userId: 1,
  communityId: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Unit test suite for deletePostUseCase
describe("deletePostUseCase", () => {
  let mockDeletePost: jest.MockedFunction<deletePost>;
  let mockGetProfile: jest.MockedFunction<getProfile>;
  let mockBaseUseCaseHandleResponse: jest.SpyInstance;

  beforeEach(() => {
    mockDeletePost = jest.fn();
    mockGetProfile = jest.fn();
    mockBaseUseCaseHandleResponse = jest.spyOn(
      require("../base/base.use-case"),
      "baseUseCaseHandleResponse",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a post successfully", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock deletePost to return a successful response
    mockDeletePost.mockResolvedValueOnce({
      data: mockPost,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await deletePostUseCase({
      context: {
        getProfile: mockGetProfile,
        deletePost: mockDeletePost,
      },
      id: 1,
    });

    expect(result).toEqual({ data: mockPost });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockDeletePost).toHaveBeenCalledWith(1);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPost,
      error: undefined,
    });
  });

  it("should return an error if user is not authenticated", async () => {
    // Mock getProfile to return null (user not authenticated)
    mockGetProfile.mockResolvedValueOnce(null);

    const result = await deletePostUseCase({
      context: {
        getProfile: mockGetProfile,
        deletePost: mockDeletePost,
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
    expect(mockDeletePost).not.toHaveBeenCalled();
  });

  it("should handle errors from deletePost API call", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock deletePost to return an error response
    mockDeletePost.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error deleting post",
        statusCode: 500,
      } as any,
    });

    const result = await deletePostUseCase({
      context: {
        getProfile: mockGetProfile,
        deletePost: mockDeletePost,
      },
      id: 1,
    });

    expect(result).toEqual({
      error: {
        message: "Error deleting post",
        statusCode: 500,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockDeletePost).toHaveBeenCalledWith(1);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error deleting post",
        statusCode: 500,
      },
    });
  });
});
