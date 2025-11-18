import api from "./index";

export interface Playlist {
  _id: string;
  name: string;
  itemCount: number;
}

export interface PlaylistsResponse {
  items: Playlist[];
  total: number;
  page: number;
  limit: number;
}

export interface CreatePlaylistRequest {
  name: string;
  itemUrls?: string[];
}

export interface CreatePlaylistResponse {
  _id: string;
  name: string;
  itemCount: number;
}

export const getPlaylists = async (params: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PlaylistsResponse> => {
  const res = await api.get<PlaylistsResponse>("/playlists", { params });
  return res.data;
};

export const createPlaylist = async (
  payload: CreatePlaylistRequest
): Promise<CreatePlaylistResponse> => {
  const res = await api.post<CreatePlaylistResponse>("/playlists", payload);
  return res.data;
};
