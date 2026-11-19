import heroAssets from "./heroSlideshowAssets.json";

export interface HeroSlide {
  id: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
}

export const HERO_SLIDES: HeroSlide[] = (heroAssets as Array<{
  file: string;
  publicId: string;
  secureUrl: string;
  optimizedUrl: string;
  thumbUrl: string;
  width: number;
  height: number;
}>).map((asset, index) => ({
  id: `hero-slide-${index + 1}`,
  url: asset.optimizedUrl,
  thumbUrl: asset.thumbUrl,
  width: asset.width,
  height: asset.height,
}));

