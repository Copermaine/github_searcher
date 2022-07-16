import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";


const Layout: React.FC = () => {
    return (
        <div className='App'>
            <Header/>

            <div className='container'>
                <Outlet/>
            </div>

        </div>
    );
};

export { Layout };

