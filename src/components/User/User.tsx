import React from "react";
import styles from "./User.module.scss";
import { useNavigate } from "react-router-dom";


type UserPropsType = {
    name: string | null
    login: string
    avatar: string
    repos: number | null
}

const User: React.FC<UserPropsType> = ({ name, login, avatar, repos }) => {
    const navigate = useNavigate();

    const goToMoreInfo = () => navigate(`/user/${login}`);

    return (
        <div className={styles.user_container} onClick={goToMoreInfo}>
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


export { User };
