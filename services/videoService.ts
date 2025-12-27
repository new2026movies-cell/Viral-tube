import { Video } from '../types';
import { MOCK_VIDEOS } from '../constants';

const STORAGE_KEY = 'pytube_library_v5'; // Bumped to v5 to reflect thumbnail update

/**
 * Retrieves the video library from local storage.
 * Initializes with the user's specific defaults if empty.
 */
export const getVideos = (): Video[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_VIDEOS));
    return MOCK_VIDEOS;
  }
  
  return JSON.parse(stored);
};

export const saveVideos = (videos: Video[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
};

export const addVideo = (video: Video) => {
  const current = getVideos();
  saveVideos([video, ...current]);
};

export const deleteVideo = (id: string) => {
  const current = getVideos();
  saveVideos(current.filter(v => v.id !== id));
};

export const updateVideo = (updatedVideo: Video) => {
  const current = getVideos();
  saveVideos(current.map(v => v.id === updatedVideo.id ? updatedVideo : v));
};