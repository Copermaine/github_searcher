import React from "react";
import SearchFieldContainer from "../components/SearchField/SearchFieldContainer";
import { UsersContainer } from "../components/Users/UsersContainer";

const SearchUsersPage: React.FC = () => {
    return (
        <>
            <SearchFieldContainer/>
            <UsersContainer/>
        </>
    );
}

export { SearchUsersPage };
