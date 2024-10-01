import { updatePostUseCase } from "./update-post.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import {
  type Post,
  type UpdatePostDto,
} from "@/interfaces/services/post.service.interface";
import { type updatePost } from "@/interfaces/use-cases/post.use-case.interface";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";

// Mock data
const mockPost: Post = {
  id: 1,
  title: "Updated Post Title",
  detail: "This is the updated detail of the post",
  userId: 1,
  communityId: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockUpdatePostDto: UpdatePostDto = {
  title: "Updated Post Title",
  detail: "This is the updated detail of the post",
};

// Unit test suite for updatePostUseCase
describe("updatePostUseCase", () => {
  let mockUpdatePost: jest.MockedFunction<updatePost>;
  let mockGetProfile: jest.MockedFunction<getProfile>;
  let mockBaseUseCaseHandleResponse: jest.SpyInstance;

  beforeEach(() => {
    mockUpdatePost = jest.fn();
    mockGetProfile = jest.fn();
    mockBaseUseCaseHandleResponse = jest.spyOn(
      require("../base/base.use-case"),
      "baseUseCaseHandleResponse",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a post successfully", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock updatePost to return a successful response
    mockUpdatePost.mockResolvedValueOnce({
      data: mockPost,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await updatePostUseCase({
      context: {
        getProfile: mockGetProfile,
        updatePost: mockUpdatePost,
      },
      id: 1,
      data: mockUpdatePostDto,
    });

    expect(result).toEqual({ data: mockPost });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockUpdatePost).toHaveBeenCalledWith(1, mockUpdatePostDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPost,
      error: undefined,
    });
  });

  it("should return an error if user is not authenticated", async () => {
    // Mock getProfile to return null (user not authenticated)
    mockGetProfile.mockResolvedValueOnce(null);

    const result = await updatePostUseCase({
      context: {
        getProfile: mockGetProfile,
        updatePost: mockUpdatePost,
      },
      id: 1,
      data: mockUpdatePostDto,
    });

    expect(result).toEqual({
      error: {
        error: "Unauthorized",
        message: BaseErrorEnum.USER_NOT_AUTHENTICATED,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockUpdatePost).not.toHaveBeenCalled();
  });

  it("should handle errors from updatePost API call", async () => {
    // Mock getProfile to return a valid user profile
    mockGetProfile.mockResolvedValueOnce({
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
      pictureUrl: "https://example.com/profile.jpg",
      iat: 1633024800,
      exp: 1633111200,
    });

    // Mock updatePost to return an error response
    mockUpdatePost.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error updating post",
        statusCode: 500,
      } as any,
    });

    const result = await updatePostUseCase({
      context: {
        getProfile: mockGetProfile,
        updatePost: mockUpdatePost,
      },
      id: 1,
      data: mockUpdatePostDto,
    });

    expect(result).toEqual({
      error: {
        message: "Error updating post",
        statusCode: 500,
      },
    });
    expect(mockGetProfile).toHaveBeenCalled();
    expect(mockUpdatePost).toHaveBeenCalledWith(1, mockUpdatePostDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error updating post",
        statusCode: 500,
      },
    });
  });
});
