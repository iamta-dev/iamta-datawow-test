import {
  getPostIdUseCase,
  getPostsUseCase,
  getMyPostsUseCase,
} from "./get-post.use-case";
import {
  type Post,
  type PostParamsDto,
} from "@/interfaces/services/post.service.interface";
import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";
import {
  type getPostById,
  type getPosts,
  type getMyPosts,
} from "@/interfaces/use-cases/post.use-case.interface";

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

const mockPosts: Post[] = [mockPost];

// Unit test suite for post use cases
describe("Post Use Cases", () => {
  let mockGetPostById: jest.MockedFunction<getPostById>;
  let mockGetPosts: jest.MockedFunction<getPosts>;
  let mockGetMyPosts: jest.MockedFunction<getMyPosts>;
  let mockGetProfile: jest.MockedFunction<getProfile>;
  let mockBaseUseCaseHandleResponse: jest.SpyInstance;

  beforeEach(() => {
    mockGetPostById = jest.fn();
    mockGetPosts = jest.fn();
    mockGetMyPosts = jest.fn();
    mockGetProfile = jest.fn();
    mockBaseUseCaseHandleResponse = jest.spyOn(
      require("../base/base.use-case"),
      "baseUseCaseHandleResponse",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get post by id successfully", async () => {
    // Mock getPostById to return a successful response
    mockGetPostById.mockResolvedValueOnce({
      data: mockPost,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await getPostIdUseCase({
      context: {
        getProfile: mockGetProfile,
        getPostById: mockGetPostById,
      },
      id: 1,
    });

    expect(result).toEqual({ data: mockPost });
    expect(mockGetPostById).toHaveBeenCalledWith(1);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPost,
      error: undefined,
    });
  });

  it("should get posts successfully", async () => {
    const mockPostParamsDto: PostParamsDto = { fsearch: "test" };

    // Mock getPosts to return a successful response
    mockGetPosts.mockResolvedValueOnce({
      data: mockPosts,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await getPostsUseCase({
      context: {
        getProfile: mockGetProfile,
        getPosts: mockGetPosts,
      },
      postParamsDto: mockPostParamsDto,
    });

    expect(result).toEqual({ data: mockPosts });
    expect(mockGetPosts).toHaveBeenCalledWith(mockPostParamsDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPosts,
      error: undefined,
    });
  });

  it("should get my posts successfully", async () => {
    const mockPostParamsDto: PostParamsDto = { fsearch: "test" };

    // Mock getMyPosts to return a successful response
    mockGetMyPosts.mockResolvedValueOnce({
      data: mockPosts,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await getMyPostsUseCase({
      context: {
        getProfile: mockGetProfile,
        getMyPosts: mockGetMyPosts,
      },
      postParamsDto: mockPostParamsDto,
    });

    expect(result).toEqual({ data: mockPosts });
    expect(mockGetMyPosts).toHaveBeenCalledWith(mockPostParamsDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockPosts,
      error: undefined,
    });
  });

  it("should handle errors when getting post by id", async () => {
    // Mock getPostById to return an error response
    mockGetPostById.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error fetching post by ID",
        statusCode: 500,
      } as any,
    });

    const result = await getPostIdUseCase({
      context: {
        getProfile: mockGetProfile,
        getPostById: mockGetPostById,
      },
      id: 1,
    });

    expect(result).toEqual({
      error: {
        message: "Error fetching post by ID",
        statusCode: 500,
      },
    });
    expect(mockGetPostById).toHaveBeenCalledWith(1);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error fetching post by ID",
        statusCode: 500,
      },
    });
  });

  it("should handle errors when getting posts", async () => {
    const mockPostParamsDto: PostParamsDto = { fsearch: "test" };

    // Mock getPosts to return an error response
    mockGetPosts.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error fetching posts",
        statusCode: 500,
      } as any,
    });

    const result = await getPostsUseCase({
      context: {
        getProfile: mockGetProfile,
        getPosts: mockGetPosts,
      },
      postParamsDto: mockPostParamsDto,
    });

    expect(result).toEqual({
      error: {
        message: "Error fetching posts",
        statusCode: 500,
      },
    });
    expect(mockGetPosts).toHaveBeenCalledWith(mockPostParamsDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error fetching posts",
        statusCode: 500,
      },
    });
  });

  it("should handle errors when getting my posts", async () => {
    const mockPostParamsDto: PostParamsDto = { fsearch: "test" };

    // Mock getMyPosts to return an error response
    mockGetMyPosts.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error fetching my posts",
        statusCode: 500,
      } as any,
    });

    const result = await getMyPostsUseCase({
      context: {
        getProfile: mockGetProfile,
        getMyPosts: mockGetMyPosts,
      },
      postParamsDto: mockPostParamsDto,
    });

    expect(result).toEqual({
      error: {
        message: "Error fetching my posts",
        statusCode: 500,
      },
    });
    expect(mockGetMyPosts).toHaveBeenCalledWith(mockPostParamsDto);
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error fetching my posts",
        statusCode: 500,
      },
    });
  });
});
