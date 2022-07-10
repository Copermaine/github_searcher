import React from "react";
import { UsersSearchFieldContainer } from "../components/SearchField/UsersSearchFieldContainer";
import { UsersContainer } from "../components/Users/UsersContainer";

const SearchUsersPage: React.FC = () => {
    return (
        <>
            <UsersSearchFieldContainer/>
            <UsersContainer/>
        </>
    );
};

export { SearchUsersPage };
