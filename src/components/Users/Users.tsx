import React from "react";
import SearchField from "../SearchField/SearchField";
import { useDebounce } from "../../hooks/useDebounce";
import User from "../User/User";
import styles from "./Users.module.scss";
import { clearUsers, getUsers } from "../../redux/mainSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";


/*type UsersType = {
    id: number
    public_repos: number
    avatar_url: string
    name: string
    login: string
    //bio: string | null
}*/

const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.main.users);
    const isLoading = useAppSelector(state => state.main.isLoading);

    const [value, setValue] = React.useState<string>('');
    // const [filtered, setFiltered] = React.useState<UsersType[]>([]);
    const debouncedSearch = useDebounce(value, 1000);

    const handlerSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            dispatch(clearUsers());
        }
        setValue(inputValue);
    }

    React.useEffect(() => {
        if (debouncedSearch) {
            //Api.searchUsers(debouncedSearch).then((res: any) => setFiltered(res))
            dispatch(getUsers(debouncedSearch));
        }
    }, [debouncedSearch])

    if (isLoading) {
        return <div>...Loading</div>
    }

    return (
        <div className={styles.users}>
            <SearchField value={value} changeSearchValue={handlerSearchValue}/>
            {
                users.length
                    ? users.map(user => (
                        <User key={user.id} avatar={user.avatar_url} name={user.name}
                              login={user.login} repos={user.public_repos}/>
                    ))
                    : <div>Users not found</div>
            }
        </div>
    )
};

export default Users;
