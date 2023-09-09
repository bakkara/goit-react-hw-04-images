import { useEffect, useState } from 'react';
import { fetchImages } from "api";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Layout } from "./Layout";
import { Loader } from "./Loader/Loader";
import { SearchBar } from "./SearchBar/SearchBar";
import { toast, Toaster } from 'react-hot-toast';
import { ModalComponent } from "./Modal/Modal";


export const App =() => {

  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')
  const [tag, setTag] = useState('')

  const onSearch = (evt) => {
     evt.preventDefault();
     const value = evt.target.query.value.trim('');
    if (value === '') return toast.error(`Enter your request`);  
    setQuery(`${Date.now()}/${value}`)
    setImages([])
    setPage(1)
  } 

  const handlerLoadMore = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    if (!query) return;
  async function searchImage() { 
        try {
        setLoading(true);
        setError(false);
         const { hits, totalHits } = await fetchImages(
           query.slice(14),
           page
         );
         if (hits.length === 0) {
           return toast.error(`We didn't find anything. Try again`);
         } else {
           if (page === 1) {
             toast.success(`We find ${totalHits} pictures`);
           }
         }
         setImages((prevState) => [...prevState, ...hits]);;
          setLoadMore(page < Math.ceil(totalHits / 12))
       } catch (error) {
         setError(true);
         toast.error(`OOPS! THERE WAS AN ERROR!`)
       }
       finally {
         setLoading(false);
       }
    }
    searchImage()
}, [query, page])
  
  
  const openModal = (largeImageURL, tag) => {
    setIsModalOpen(true);
    setLargeImageURL(largeImageURL);
    setTag(tag);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageURL('');
    setTag('');
  }

    return (
      <Layout>
        <SearchBar onSubmit={onSearch} />
        {loading && <Loader/>}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
        {images.length > 0 && <ImageGallery gallery={images} onImageClick={openModal} />}
        {loadMore && <Button onLoadMore={handlerLoadMore} />}
        {isModalOpen && <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          largeImageURL={largeImageURL}
          tag={tag}
        />}
        <Toaster position="top-right"/>
      </Layout>
    )
  }
