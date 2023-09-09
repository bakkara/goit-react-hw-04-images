import { SearchBarHeader, SearchButton, SearchForm, SearchInput } from "./Searchbar.styled"
import { BsSearchHeart } from 'react-icons/bs';

export const SearchBar = ({ onSubmit }) => {
    return (
        <SearchBarHeader>
            <SearchForm onSubmit={onSubmit}>
                <SearchButton type="submit">
                    <BsSearchHeart/>
                </SearchButton >
                <SearchInput
                    type="text"
                    name="query"
                placeholder="Search images and photos"
                />
            </SearchForm>
       </SearchBarHeader>
    )
} 