import type { ImagesResult } from "@/Models/Images";
import { ImagesSchemaWithPhotos } from "@/Models/Images";
import env from "./env";
export default async function fetchImages(
  url: string
): Promise<ImagesResult | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("Fetch Images Error!\n");
    const imagesResults: ImagesResult = await res.json();
    console.log(imagesResults);
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);
    if (parsedData.total_results === 0) return undefined;
    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
