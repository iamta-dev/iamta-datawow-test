import { type getProfile } from "@/interfaces/use-cases/base.use-case.interface";
import { type getCommunities } from "@/interfaces/use-cases/community.use-case.interface";
import { type Community } from "@/interfaces/services/community.service.interface";
import { getCommunitiesUseCase } from "./get-community.use-case";

// Mock data
const mockCommunities: Community[] = [
  {
    id: 1,
    name: "Community 1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Community 2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Unit test suite for getCommunitiesUseCase
describe("getCommunitiesUseCase", () => {
  let mockGetCommunities: jest.MockedFunction<getCommunities>;
  let mockGetProfile: jest.MockedFunction<getProfile>;
  let mockBaseUseCaseHandleResponse: jest.SpyInstance;

  beforeEach(() => {
    mockGetCommunities = jest.fn();
    mockGetProfile = jest.fn();
    mockBaseUseCaseHandleResponse = jest.spyOn(
      require("../base/base.use-case"),
      "baseUseCaseHandleResponse",
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch communities successfully", async () => {
    // Mock getCommunities to return a successful response
    mockGetCommunities.mockResolvedValueOnce({
      data: mockCommunities,
      error: undefined,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await getCommunitiesUseCase({
      context: {
        getProfile: mockGetProfile,
        getCommunities: mockGetCommunities,
      },
    });

    expect(result).toEqual({ data: mockCommunities });
    expect(mockGetCommunities).toHaveBeenCalled();
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: mockCommunities,
      error: undefined,
    });
  });

  it("should handle errors from getCommunities API call", async () => {
    // Mock getCommunities to return an error response
    mockGetCommunities.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: "Error fetching communities",
        statusCode: 500,
      } as any,
    });

    // Spy on baseUseCaseHandleResponse to verify that it's called with the error response
    mockBaseUseCaseHandleResponse.mockImplementation((response) => response);

    const result = await getCommunitiesUseCase({
      context: {
        getProfile: mockGetProfile,
        getCommunities: mockGetCommunities,
      },
    });

    expect(result).toEqual({
      error: {
        message: "Error fetching communities",
        statusCode: 500,
      },
    });
    expect(mockGetCommunities).toHaveBeenCalled();
    expect(mockBaseUseCaseHandleResponse).toHaveBeenCalledWith({
      data: undefined,
      error: {
        message: "Error fetching communities",
        statusCode: 500,
      },
    });
  });
});
