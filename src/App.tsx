import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { SearchUsersPage } from "./Pages/SearchUsersPage";
import { UserPage } from "./Pages/UserPage";


const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<SearchUsersPage/>}/>
                <Route path='user/:login' element={<UserPage/>}/>
                <Route path='*' element={ <h1>Page not found</h1> }/>
            </Route>
        </Routes>
    );
};

export { App };
