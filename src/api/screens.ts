import api from "./index";

export interface Screen {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScreensResponse {
  items: Screen[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateScreenRequest {
  name: string;
  isActive?: boolean;
}

export interface CreateScreenResponse {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getScreens = async (params: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ScreensResponse> => {
  const res = await api.get<ScreensResponse>("/screens", { params });
  return res.data;
};

export const createScreen = async (
  data: CreateScreenRequest
): Promise<CreateScreenResponse> => {
  const res = await api.post<CreateScreenResponse>("/screens", data);
  return res.data;
};

export const toggleScreenStatus = async (id: string) => {
  const res = await api.put(`/screens/${id}`);
  return res.data;
};
