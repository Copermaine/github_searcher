import React from "react";
import { User } from "../User/User";
import styles from "./Users.module.scss";
import { setIsLoadMore } from "../../redux/mainSlice";
import { useInView } from "react-intersection-observer";
import { useAppDispatch } from "../../hooks";
import { IUser } from "../../types";


type UsersPropsType = {
    users: IUser[];
    totalUserCount: number;
    usersCount: number;
    isLoadMore: boolean;
}

const Users: React.FC<UsersPropsType> = ({ users, totalUserCount, usersCount, isLoadMore }) => {

    const dispatch = useAppDispatch();

    // Intersection Observer hook
    const { ref: myRef, inView } = useInView();

    React.useEffect(() => {
        if (usersCount < totalUserCount) {
           dispatch(setIsLoadMore(inView));
        }
    }, [inView]);

    return (
        <div className={styles.users}>
            {
                totalUserCount > 1
                    ? <h4>Users found: {totalUserCount}</h4>
                    : <h4>User found: {totalUserCount}</h4>
            }
            {
                users.map(user => (
                    <User key={user.id} avatar={user.avatar_url} name={user.name}
                          login={user.login} repos={user.public_repos}/>
                ))
            }
            <div ref={myRef}/>
            {
                isLoadMore && <h2>Load more users...</h2>
            }
            <h2>{inView}</h2>
        </div>
    );
};

export { Users };
