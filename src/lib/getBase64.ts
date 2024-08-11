import { getPlaiceholder } from "plaiceholder";
import type { Photo,ImagesResult } from "@/Models/Images";

async function getBase64(imageUrl:string) {
    try {
        const res = await fetch(imageUrl)
        if(!res.ok){
            console.log(`Failed to fetch images ${res.status} ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer()
        const {base64} = await getPlaiceholder(Buffer.from(buffer))

        console.log(base64)

        return base64
    }catch(e){
        if(e instanceof Error) console.log(e.stack)
    }
}

export default async function addBlurredDataUrl(images:ImagesResult):Promise<Photo[]> {
    const base64Promises = images.photos.map(photo=>getBase64(photo.src.large))
    const base64Results = await Promise.all(base64Promises)
    const photoWithBlur:Photo[] = images.photos.map((photo,i)=>{
        photo.blurredDataUrl= base64Results[i]
        return photo
    })
    return photoWithBlur
}