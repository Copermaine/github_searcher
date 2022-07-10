import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useDebounce } from "../../hooks/useDebounce";
import { getUsers } from "../../redux/mainSlice";
import { Users } from "./Users";


const UsersContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.main.users);
    const totalCount = useAppSelector(state => state.main.totalCount);
    const isLoading = useAppSelector(state => state.main.isLoading);

    const usersSearchValue = useAppSelector(state => state.main.usersSearchValue);

    const debouncedSearch = useDebounce(usersSearchValue, 1000);

    React.useEffect(() => {
        if (debouncedSearch) {
            dispatch(getUsers(debouncedSearch));
        }
    }, [debouncedSearch]);

    if (isLoading) {
        return <h2>...Loading</h2>
    }
    return (
        <>

            {
                users.length
                    ? <Users users={users} totalCount={totalCount}/>
                    : <h2>Users not found</h2>
            }

        </>
    );
};

export { UsersContainer };
