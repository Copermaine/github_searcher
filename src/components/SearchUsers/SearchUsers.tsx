import React from "react";
import SearchFieldContainer from "../SearchField/SearchFieldContainer";
import UsersContainer from "../Users/UsersContainer";

const SearchUsers: React.FC = () => {
    return (
        <>
            <SearchFieldContainer/>
            <UsersContainer/>
        </>
    );
}

export { SearchUsers };
