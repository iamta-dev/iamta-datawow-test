export interface JwtPayload {
  id: number;
  username: string;
  pictureUrl: string;
}

// Extend the Request interface to include the user property.
// This is used when applying @UseGuards(AuthGuard('jwt')) on a controller.
export interface RequestWithUser extends Request {
  user: JwtPayload;
}
