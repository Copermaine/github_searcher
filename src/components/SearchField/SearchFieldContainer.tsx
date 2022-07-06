import React from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearUsers, setSearchValue } from "../../redux/mainSlice";
import SearchField from "./SearchFieldType";

const SearchFieldContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(state => state.main.searchValue);

    const handlerSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            dispatch(clearUsers());
        }
        dispatch(setSearchValue(inputValue))
    }
    return <SearchField value={searchValue} changeSearchValue={handlerSearchValue}/>
};

export default SearchFieldContainer;
