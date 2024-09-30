import { type ServiceResponse } from "@/interfaces/services/base.service";
import { BaseService } from "./base.service";
import { type Community } from "@/interfaces/services/community.service";

export class CommunityService extends BaseService {
  public async getCommunities(): Promise<ServiceResponse<Community[]>> {
    return this.handleRequest(() =>
      this.backendApi.get<Community[]>(`/api/v1/communities`),
    );
  }
}

export const communityService = new CommunityService();
