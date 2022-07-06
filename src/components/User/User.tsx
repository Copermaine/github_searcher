import React from "react";
import styles from "./User.module.scss";


type UserProps = {
    name: string | null
    login: string | null
    avatar: string
    repos: number | null
}

const User: React.FC<UserProps> = ({ name, login, avatar, repos }) => {
    return (
        <div className={styles.user_container}>
            <img src={avatar} alt='Avatar'/>
            {
                name
                    ? <div>
                        <h4 className={styles.user_name}>User name:</h4>
                        <h3 className={styles.user_name}>{name}</h3>
                    </div>
                    : <div>
                        <h4 className={styles.user_name}>User login:</h4>
                        <h3 className={styles.user_name}>{login}</h3>
                    </div>
            }
            <h4 className={styles.user_repo}>Repo: {repos}</h4>
        </div>
    );
};


export default User;
