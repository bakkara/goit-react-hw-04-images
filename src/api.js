import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => { 
    const params = new URLSearchParams( {
            key: '38386051-011a72b257babeceb2a40a556',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 12,
    })
    const response = await axios.get(`?${params}`);
    const { hits, totalHits } = response.data;
    return { hits, totalHits };
  
}