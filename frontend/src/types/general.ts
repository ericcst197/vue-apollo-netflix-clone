export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
import YouTubePlayer from 'youtube-player';

declare global {
    interface Window {
        YouTubePlayer: typeof YouTubePlayer;
    }
}
