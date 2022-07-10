import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";

import styles from "./UserInfo.module.scss"


const UserInfo: React.FC = () => {
    const { login } = useParams();

    const user = useAppSelector(state => state.main.users.find(u => u.login === login));
    const date = new Date(user?.created_at ?? '').toLocaleDateString('ukr');

    return (
        <div className={styles.user_main}>
            <div className={styles.user_info}>

                <img src={user?.avatar_url} alt={user?.avatar_url}/>

                <div className={styles.user_descr}>
                    <h4>User Name: {user?.name}</h4>
                    <h4>Email: {user?.email ?? 'none'}</h4>
                    <h4>Location: {user?.location ?? 'none'}</h4>
                    <h4>Join Date: {date}</h4>
                    <h4>{user?.followers} Followers</h4>
                    <h4>Following: {user?.following}</h4>
                </div>
            </div>
            <div className={styles.user_bio}>
                <h6>Bio: {user?.bio ?? 'none'}</h6>
            </div>
        </div>
    );
};

export { UserInfo };
