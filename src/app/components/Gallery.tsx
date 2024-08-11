import fetchImages from "@/lib/fetchImages";
import type { ImagesResult } from "@/Models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrl from "@/lib/getBase64";
import getPrevNext from "@/lib/getPrevNext";
import Footer from "./Footer";

type Props = {
  topic?:string|undefined
  page?:string|undefined
}

export default async function Gallery({topic='curated',page}:Props) {

  let url 
  if(topic==='curated'&& page){
    url = `https://api.pexels.com/v1/curated?page=${page} `
  }else if(topic==='curated'){
    url = "https://api.pexels.com/v1/curated"
  }else if(!page){
    url = `https://api.pexels.com/v1/search?query=${topic}`
  }else{
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
  }
 
  const images: ImagesResult | undefined = await fetchImages(url);
  if (!images || images.per_page===0)
    return <h2 className="m-4 text-2xl font-bold">No images are found</h2>;
  const photosWithBlur = await addBlurredDataUrl(images)
  const {prevPage,nextPage} = getPrevNext(images)
  const footerProps = {topic,page,prevPage,nextPage}

  return (
    <>
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
      {photosWithBlur.map((photo) => (
        <ImgContainer photo={photo} />
      ))}
    </section>
    <Footer {...footerProps}/>
    </>
    
  );
}
