import React from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "../components/UserInfo/UserInfo";
import { ReposSearchFieldContainer } from "../components/SearchField/ReposSearchFieldContainer";
import styles from "./UserPage.module.scss";
import { ReposContainer } from "../components/Repos/ReposContainer";


const UserPage: React.FC = () => {
    return (
        <div>
            <UserInfo/>
            <Link to='/'>Go back</Link>
            <div>
                <div className={styles.user_page_search_repo}>
                    <ReposSearchFieldContainer/>
                </div>
                <ReposContainer/>
            </div>
        </div>
    );
};

export { UserPage };

