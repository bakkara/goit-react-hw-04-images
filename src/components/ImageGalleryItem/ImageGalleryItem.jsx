import { ImageGalleryImg } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({url, tag}) => {
    return (
        <>
           <ImageGalleryImg src={url} alt={tag} />
        </>
    )
}