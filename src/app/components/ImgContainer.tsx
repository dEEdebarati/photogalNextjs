import { Photo } from "@/Models/Images";
import Image from "next/image";
import Link from "next/link";
type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  const widthHeightRatio = photo.height/photo.width
  const galleryHeight = Math.ceil(250*widthHeightRatio)
  const photoSpan = Math.ceil(galleryHeight/10)+1
  return (
    <div
      key={photo.id}
      className="w-[250px] justify-self-center"
      style={{gridRow:`span ${photoSpan}`}}
    >
      <Link href={photo.url} target="_blank" className="grid place-content-center">
      <div className="rounded-xl overflow-hidden group">
      <Image
        src={photo.src.large}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
       
        // sizes="(min-width: 1320px) 278px, (min-width: 1060px) calc(9.58vw + 153px), (min-width: 800px) 33.33vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
        sizes="250px"
        className="group-hover:opacity-70"
        placeholder="blur"
        blurDataURL={photo.blurredDataUrl}
      />
      </div>
      </Link>
    </div>
  );
}
