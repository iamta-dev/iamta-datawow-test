import { createPostUseCase } from "./create-post.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import {
  type Post,
  type CreatePostDto,
} from "@/interfaces/services/post.service.interface";
import { type createPost } from "@/interfaces/use-cases/post.use-case.interface";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";

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

const mockCreatePostDto: CreatePostDto = {
  title: "Test Post",
  detail: "This is a test post",
  communityId: 1,
};

// Unit test suite for createPostUseCase
describe("createPostUseCase", () => {
  let mockCreatePost: jest.MockedFunction<createPost>;
  let mockGetProfile: jest.MockedFunction<getProfile>;
  let mockBaseUseCaseHandleResponse: jest.SpyInstance;

  beforeEach(() => {
    mockCreatePost = jest.fn();
    mockGetProfile = jest.fn();
    mockBaseUseCaseHandleResponse = jest.spyOn(
      require("../base/base.use-case"),
      "baseUseCaseHandleResponse",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a post successfully", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock createPost to return a successful response
    mockCreatePost.mockResolvedValueOnce({
      data: mockPost,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await createPostUseCase({
      context: {
        getProfile: mockGetProfile,
        createPost: mockCreatePost,
      },
      data: mockCreatePostDto,
    });

    expect(result).toEqual({ data: mockPost });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreatePost).toHaveBeenCalledWith(mockCreatePostDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPost,
      error: undefined,
    });
  });

  it("should return an error if user is not authenticated", async () => {
    // Mock getProfile to return null (user not authenticated)
    mockGetProfile.mockResolvedValueOnce(null);

    const result = await createPostUseCase({
      context: {
        getProfile: mockGetProfile,
        createPost: mockCreatePost,
      },
      data: mockCreatePostDto,
    });

    expect(result).toEqual({
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreatePost).not.toHaveBeenCalled();
  });

  it("should handle errors from createPost API call", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock createPost to return an error response
    mockCreatePost.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error creating post",
        statusCode: 500,
      } as any,
    });

    const result = await createPostUseCase({
      context: {
        getProfile: mockGetProfile,
        createPost: mockCreatePost,
      },
      data: mockCreatePostDto,
    });

    expect(result).toEqual({
      error: {
        message: "Error creating post",
        statusCode: 500,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockCreatePost).toHaveBeenCalledWith(mockCreatePostDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error creating post",
        statusCode: 500,
      },
    });
  });
});
