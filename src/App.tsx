import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { SearchUsersPage } from "./Pages/SearchUsersPage";
import { UserPage } from "./Pages/UserPage";

const App: React.FC = () => {
    /* const [value, setValue] = React.useState('');
     const [filtered, setFiltered] = React.useState([]);
     const debouncedSearch = useDebounce(value, 1000);
     const changeSearchValue = (e: any) => {
         setValue(e.target.value)
     }*/

    /*React.useEffect(() => {
        if (debouncedSearch) {
            searchApi.searchUsers(debouncedSearch).then((res: any) => setFiltered(res))
        }
    }, [debouncedSearch])*/


    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<SearchUsersPage/>}/>
                <Route path='user/:login' element={<UserPage/>}/>
            </Route>
        </Routes>
        /* <div className='App'>
            {/!* <header className='App-header'>
                 <h1>Github Searcher</h1>
             </header>*!/}
             <div className='container'>
                 <UsersSearchFieldContainer/>
                 <UsersContainer/>
             </div>

         </div>*/
    );
}

export { App };
