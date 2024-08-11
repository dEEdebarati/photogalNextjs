import { ImagesResult } from "@/Models/Images";

function getPageNumber(url:string){
    const {searchParams} = new URL(url)
    return searchParams.get('page') 
}


export default function getPrevNext(images:ImagesResult) {
  let nextPage = images?.next_page
  ?getPageNumber(images.next_page)
  :null

  const prevPage = images?.prev_page
  ?getPageNumber(images.prev_page)
  :null

  const total_pages = images.total_results%images.per_page
  ?Math.ceil(images.total_results / images.per_page)
  :Math.ceil(images.total_results / images.per_page)+1

  if(prevPage && (parseInt(prevPage)+5)<total_pages){
    nextPage = (parseInt(prevPage)+5).toString()
  }
  if(nextPage && parseInt(nextPage) >= total_pages){
    nextPage = null
  }

  return{prevPage,nextPage}
}
