import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearUsers, setUserCurrentPage, setUsersSearchValue } from "../../redux/mainSlice";
import { SearchField } from "./SearchField";


const UsersSearchFieldContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const usersSearchValue = useAppSelector(state => state.main.usersSearchValue);

    const handlerSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            dispatch(clearUsers());
        }
        dispatch(setUsersSearchValue(inputValue));
        dispatch(setUserCurrentPage());
    };

    return <SearchField value={usersSearchValue} changeValue={handlerSearchValue} placeholder={'Search users'}/>
};

export { UsersSearchFieldContainer };
