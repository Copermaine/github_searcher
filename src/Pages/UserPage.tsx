import React from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "../components/UserInfo/UserInfo";
import { Repos } from "../components/Repos/Repos";
import { ReposSearchFieldContainer } from "../components/SearchField/ReposSearchFieldContainer";


const UserPage: React.FC = () => {
    return (
        <>
            <UserInfo/>
            <Link to='/'>Go back</Link>
            <ReposSearchFieldContainer/>
            <Repos/>
        </>
    );
};

export { UserPage }

