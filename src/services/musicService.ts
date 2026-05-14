import axios from 'axios';
import { Song } from '@/types';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';

type YouTubeSearchItem = {
  id: { videoId?: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails?: { high?: { url: string }; medium?: { url: string } };
  };
};

export class MusicService {
  async searchSong(title: string, artist?: string): Promise<Song[]> {
    const query = [title, artist].filter(Boolean).join(' ').trim();
    if (!query || !YOUTUBE_API_KEY) return [];

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API_KEY,
          part: 'snippet',
          type: 'video',
          maxResults: 10,
          q: query,
        },
      });

      const items: YouTubeSearchItem[] = response.data?.items ?? [];
      return items.reduce<Song[]>((songs, item) => {
        const videoId = item.id.videoId;
        if (!videoId) return songs;

        const videoTitle = item.snippet.title;
        const channelTitle = item.snippet.channelTitle;
        const albumArt = item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.medium?.url;

        songs.push({
          id: videoId,
          title: this.normalizeTitle(videoTitle),
          artist: this.normalizeArtist(channelTitle, videoTitle),
          albumArt,
          platform: 'youtube',
          url: `https://www.youtube.com/watch?v=${videoId}`,
        });

        return songs;
      }, []);
    } catch (error) {
      console.error('YouTube search error:', error);
      return [];
    }
  }

  async getLyrics(_song: Song): Promise<string> {
    return '';
  }

  private normalizeTitle(title: string): string {
    return title
      .replace(/\s*\(official.*?\)\s*/gi, ' ')
      .replace(/\s*\[.*?\]\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private normalizeArtist(channelTitle: string, videoTitle: string): string {
    if (videoTitle.includes(' - ')) {
      const [maybeArtist] = videoTitle.split(' - ', 1);
      const artist = maybeArtist.trim();
      if (artist) return artist;
    }

    return channelTitle.replace(/\s*-\s*Topic\s*$/i, '').trim();
  }
}

export const musicService = new MusicService();
