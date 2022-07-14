import React from "react";
import { UsersSearchFieldContainer } from "../components/SearchField/UsersSearchFieldContainer";
import { UsersContainer } from "../components/Users/UsersContainer";
import styles from "./SearchUsersPage.module.scss";


const SearchUsersPage: React.FC = () => {
    return (
        <div className={styles.search_user_page}>
            <UsersSearchFieldContainer/>
            <UsersContainer/>
        </div>
    );
};

export { SearchUsersPage };
