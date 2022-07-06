import React from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useDebounce } from "../../hooks/useDebounce";
import { getUsers } from "../../redux/mainSlice";
import Users from "./Users";


const UsersContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.main.users);
    const isLoading = useAppSelector(state => state.main.isLoading);

    const searchValue = useAppSelector(state => state.main.searchValue);

    const debouncedSearch = useDebounce(searchValue, 1000);

    React.useEffect(() => {
        if (debouncedSearch) {
            dispatch(getUsers(debouncedSearch));
        }
    }, [debouncedSearch]);

    if(isLoading) {
        return <h2>...Loading</h2>
    }
    return (
        <div>

            {
                users.length
                    ? <Users users={users}/>
                    : <h2>Users not found</h2>
            }

        </div>
    );
};

export default UsersContainer;
