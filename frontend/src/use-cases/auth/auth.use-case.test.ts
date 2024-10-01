import { loginUseCase } from "./auth.use-case";
import { BaseErrorEnum } from "@/interfaces/errors/base.error.interface";
import {
  type createSession,
  type decodeJwt,
  type login,
} from "@/interfaces/use-cases/auth.use-case.interface";
import {
  type LoginResponse,
} from "@/interfaces/services/auth.service.interface";

// Mock data and functions
const mockLoginResponse: LoginResponse = {
  accessToken: "valid-access-token",
};

const mockUserJwtPayload = {
  id: 1,
  fullName: "John Doe",
  username: "johndoe",
  pictureUrl: "https://example.com/profile.jpg",
  iat: 1633024800,
  exp: 1633111200,
};

describe("loginUseCase", () => {
  let mockLogin: jest.MockedFunction<login>;
  let mockDecodeJwt: jest.MockedFunction<decodeJwt>;
  let mockCreateSession: jest.MockedFunction<createSession>;

  beforeEach(() => {
    mockLogin = jest.fn();
    mockDecodeJwt = jest.fn();
    mockCreateSession = jest.fn();
  });

  it("should login successfully and create session", async () => {
    // Mock login response
    mockLogin.mockResolvedValueOnce({
      data: mockLoginResponse,
      error: undefined,
    });

    // Mock JWT decoding response
    mockDecodeJwt.mockReturnValueOnce({
      data: mockUserJwtPayload,
      error: undefined,
    });

    // Mock create session function
    mockCreateSession.mockResolvedValueOnce();

    const result = await loginUseCase({
      context: {
        login: mockLogin,
        decodeJwt: mockDecodeJwt,
        createSession: mockCreateSession,
      },
      data: { username: "johndoe" },
    });

    expect(result).toEqual({ result: mockLoginResponse });
    expect(mockLogin).toHaveBeenCalledWith({
      username: "johndoe",
    });
    expect(mockDecodeJwt).toHaveBeenCalledWith("valid-access-token");
    expect(mockCreateSession).toHaveBeenCalledWith({
      accessToken: "valid-access-token",
      user: mockUserJwtPayload,
    });
  });

  it("should return error if login fails with 401", async () => {
    // Mock login error with statusCode 401
    mockLogin.mockResolvedValueOnce({
      data: undefined,
      error: {
        response: {
          data: {
            statusCode: 401,
          },
        },
      },
    } as any);

    const result = await loginUseCase({
      context: {
        login: mockLogin,
        decodeJwt: mockDecodeJwt,
        createSession: mockCreateSession,
      },
      data: { username: "johndoe_not_found" },
    });

    expect(result).toEqual({
      error: { message: "Invalid Username." },
    });
    expect(mockLogin).toHaveBeenCalledWith({
      username: "johndoe_not_found",
    });
  });

  it("should return error if jwt decoding fails", async () => {
    // Mock successful login response
    mockLogin.mockResolvedValueOnce({
      data: mockLoginResponse,
      error: undefined,
    });

    // Mock JWT decoding failure
    mockDecodeJwt.mockReturnValueOnce({
      data: undefined,
      error: { message: "Invalid token" },
    });

    const result = await loginUseCase({
      context: {
        login: mockLogin,
        decodeJwt: mockDecodeJwt,
        createSession: mockCreateSession,
      },
      data: { username: "user_invalid_token" },
    });

    expect(result).toEqual({
      error: { message: "Invalid token" },
    });
    expect(mockLogin).toHaveBeenCalledWith({
      username: "user_invalid_token",
    });
    expect(mockDecodeJwt).toHaveBeenCalledWith("valid-access-token");
  });

  it("should return unexpected error if no JWT payload is found", async () => {
    // Mock successful login response
    mockLogin.mockResolvedValueOnce({
      data: mockLoginResponse,
      error: undefined,
    });

    // Mock decoding without data or error
    mockDecodeJwt.mockReturnValueOnce({
      data: undefined,
      error: undefined,
    });

    const result = await loginUseCase({
      context: {
        login: mockLogin,
        decodeJwt: mockDecodeJwt,
        createSession: mockCreateSession,
      },
      data: { username: "user_unexpected" },
    });

    expect(result).toEqual({
      error: { message: BaseErrorEnum.UNEXPECTED },
    });
    expect(mockLogin).toHaveBeenCalledWith({
      username: "user_unexpected",
    });
    expect(mockDecodeJwt).toHaveBeenCalledWith("valid-access-token");
  });
});
