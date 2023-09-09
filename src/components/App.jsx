import { fetchImages } from "api";
import { Component } from "react";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Layout } from "./Layout";
import { Loader } from "./Loader/Loader";
import { SearchBar } from "./SearchBar/SearchBar";
import { toast, Toaster } from 'react-hot-toast';
import { ModalComponent } from "./Modal/Modal";


export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    totalHits: 0,
    loadMore: false,
    isModalOpen: false,
    largeImageURL: '',
    tag: '',
  }

   onSearch = (evt) => {
     evt.preventDefault();
     const value = evt.target.query.value.trim('');
     if (value === '') return toast.error(`Enter your request`);  
    this.setState({
      query: `${Date.now()}/${value}`,
      images: [],
      page: 1,
    })
  } 

  handlerLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  async componentDidUpdate(prevProps, prevState){ 
     if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) { 
       try {
        this.setState({ loading: true, error: false });
         const { hits, totalHits } = await fetchImages(
           this.state.query.slice(14),
           this.state.page
         );
         if (hits.length === 0) {
           return toast.error(`We didn't find anything. Try again`);
         } else {
           if (this.state.page === 1) {
             toast.success(`We find ${totalHits} pictures`);
           }
         }
         this.setState((prevState) => ({
           images: [...prevState.images, ...hits],
            loadMore: this.state.page < Math.ceil(totalHits / 12)
         }));
       } catch (error) {
         this.setState({ error: true });
         toast.error(`OOPS! THERE WAS AN ERROR!`)
       }
       finally {
         this.setState({ loading: false });
       }
  }
  } 
  
  openModal = (largeImageURL, tag) => {
  this.setState({
    isModalOpen: true,
    largeImageURL,
    tag
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      largeImageURL: '',
      tag: '',
    });
  };


  render() {
    const { images, loading, error, loadMore, isModalOpen, largeImageURL, tag} = this.state;

    return (
      <Layout>
        <SearchBar onSubmit={this.onSearch} />
        {loading && <Loader/>}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
        {images.length > 0 && <ImageGallery gallery={images} onImageClick={this.openModal} />}
        {loadMore && <Button onLoadMore={this.handlerLoadMore} />}
        {isModalOpen && <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          largeImageURL={largeImageURL}
          tag={tag}
        />}
        <Toaster position="top-right"/>
      </Layout>
    )
  }
}