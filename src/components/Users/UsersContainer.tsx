import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useDebounce } from "../../hooks/useDebounce";
import { getUsers, loadMoreUsers, setIsLoadMore, setReposSearchValue, setUserCurrentPage } from "../../redux/mainSlice";
import { Users } from "./Users";


const UsersContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector(state => state.main.users);
    const usersCount = useAppSelector(state => state.main.usersCount);
    const totalCount = useAppSelector(state => state.main.totalCount);
    const userCurrentPage = useAppSelector(state => state.main.userCurrentPage);

    const isLoading = useAppSelector(state => state.main.isLoading);
    const isLoadMore = useAppSelector(state => state.main.isLoadMore);
    const err = useAppSelector(state => state.main.error);

    const usersSearchValue = useAppSelector(state => state.main.usersSearchValue);
    const debouncedSearch = useDebounce(usersSearchValue, 1000);

    React.useEffect(() => {
        if (debouncedSearch && userCurrentPage === 1) {
            dispatch(getUsers({ searchValue: debouncedSearch }));
        }
    }, [debouncedSearch]);


    //todo reset value before render
    React.useEffect(() => {
        dispatch(setIsLoadMore(false));
        dispatch(setReposSearchValue(''));

    }, []);


    React.useEffect(() => {
        if (debouncedSearch && isLoadMore) {
            dispatch(loadMoreUsers({ searchValue: debouncedSearch, page: userCurrentPage }))
        }
    }, [isLoadMore]);


    if (isLoading) {
        return <h2>...Loading</h2>
    }
    return (
        <>
            {
                err
                    ? <h2>{err}</h2>
                    : users.length
                    ? <Users users={users} totalCount={totalCount}
                             usersCount={usersCount}
                             isLoadMore={isLoadMore}/>
                    : <h2>Users not found</h2>

            }

        </>
    );
};

export { UsersContainer };
