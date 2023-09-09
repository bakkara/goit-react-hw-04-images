    import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryLi, ImageGalleryList } from "./ImageGallery.styled"

    export const ImageGallery = ({gallery, onImageClick}) => {
        return (
            <ImageGalleryList>
                {gallery.map(item => (
                    <ImageGalleryLi key={item.id} onClick={() => onImageClick(item.largeImageURL, item.tags)}>
                    <ImageGalleryItem url={item.webformatURL} tag={item.tags} />
                </ImageGalleryLi>
        ))}
        </ImageGalleryList>
    )
    }