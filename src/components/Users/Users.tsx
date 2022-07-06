import React from "react";
import User from "../User/User";
import styles from "./Users.module.scss";
import { IUser } from "../../redux/mainSlice";


type UsersType = {
    users: IUser[]
}

const Users: React.FC<UsersType> = ({ users }) => {
    /* const dispatch = useAppDispatch();
     const users = useAppSelector(state => state.main.users);
     const isLoading = useAppSelector(state => state.main.isLoading);

     const searchValue = useAppSelector(state => state.main.searchValue);*/

    //const [value, setValue] = React.useState<string>('');
    // const [filtered, setFiltered] = React.useState<UsersType[]>([]);
    /*const debouncedSearch = useDebounce(searchValue, 1000);*/

    /*const handlerSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (!inputValue) {
            dispatch(clearUsers());
        }
        setValue(inputValue);
    }*/

    /*  React.useEffect(() => {
          if (debouncedSearch) {
              //Api.searchUsers(debouncedSearch).then((res: any) => setFiltered(res))
              dispatch(getUsers(debouncedSearch));
          }
      }, [debouncedSearch])

      if (isLoading) {
          return <div>...Loading</div>
      }*/

    return (
        <div className={styles.users}>
            {
                users.map(user => (
                    <User key={user.id} avatar={user.avatar_url} name={user.name}
                          login={user.login} repos={user.public_repos}/>
                ))

            }
        </div>
    )
};

export default Users;
