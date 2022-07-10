import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setReposSearchValue } from "../../redux/mainSlice";
import { SearchField } from "./SearchField";


const ReposSearchFieldContainer = () => {
    const dispatch = useAppDispatch();

    const reposSearchValue = useAppSelector(state => state.main.reposSearchValue);

    const handlerSearchReposValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!inputValue) {
        }
        dispatch(setReposSearchValue(inputValue));
    };

    return <SearchField value={reposSearchValue} changeValue={handlerSearchReposValue}
                        placeholder={'Search for Users\' Repositories'}/>

};

export { ReposSearchFieldContainer };
