export interface Community {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommunityDto {
  name: string;
}

export type UpdateCommunityDto = Partial<CreateCommunityDto>;
