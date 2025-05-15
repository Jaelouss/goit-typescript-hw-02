import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_KEY,
});

export type UnsplashPhoto = Photos["results"][0];
export type PartialPhoto = Partial<UnsplashPhoto>;

export type ImageSearchResponse = {
  results: Photos["results"];
  totalPages: number;
};

export type UnsplashApi = (
  arg1: string,
  arg2: number
) => Promise<ImageSearchResponse>;

export const imageSearch: UnsplashApi = async (topic, page = 1) => {
  const result = await unsplash.search.getPhotos({
    query: topic,
    page,
    perPage: 10,
    orientation: "landscape",
  });

  if (result.type === "success") {
    return {
      results: result.response.results,
      totalPages: result.response.total_pages,
    };
  }

  throw new Error(result.errors?.join("\n") || "Unknown Unsplash API error");
};
