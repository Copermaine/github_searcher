import React from "react";
import { User } from "../User/User";
import styles from "./Users.module.scss";
import { IUser } from "../../redux/mainSlice";


type UsersType = {
    users: IUser[];
    totalCount: number;
}

const Users: React.FC<UsersType> = ({ users , totalCount}) => {

    return (
        <div className={styles.users}>
            {
                totalCount > 1
                    ? <h4>Users found: {totalCount}</h4>
                    : <h4>User found: {totalCount}</h4>
            }
            {
                users.map(user => (
                    <User key={user.id} avatar={user.avatar_url} name={user.name}
                          login={user.login} repos={user.public_repos}/>
                ))

            }
        </div>
    );
};

export { Users };
