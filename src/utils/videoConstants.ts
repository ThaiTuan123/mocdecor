import { YOUTUBE_EMBED_BASE_URL } from '@/utils/constants';

export const getIframeSrc = (
  videoId: string,
  autoplay: boolean,
  mute: boolean,
  controls: boolean,
  loop: boolean
): string => {
  const autoplayVal = autoplay ? 1 : 0;
  const muteVal = mute ? 1 : 0;
  const controlsVal = controls ? 1 : 0;
  const loopVal = loop ? 1 : 0;

  return `${YOUTUBE_EMBED_BASE_URL}${videoId}?autoplay=${autoplayVal}&mute=${muteVal}&controls=${controlsVal}&loop=${loopVal}&playlist=${videoId}`;
};
