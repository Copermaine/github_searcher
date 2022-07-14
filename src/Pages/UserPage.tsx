import React from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "../components/UserInfo/UserInfo";
import { Repos } from "../components/Repos/Repos";
import { ReposSearchFieldContainer } from "../components/SearchField/ReposSearchFieldContainer";
import styles from "./UserPage.module.scss";


const UserPage: React.FC = () => {
    return (
        <div>
            <UserInfo/>
            <Link to='/'>Go back</Link>
            <div>
                <div className={styles.user_page_search_repo}>
                    <ReposSearchFieldContainer/>
                </div>
                <Repos/>
            </div>
        </div>
    );
};

export { UserPage };

