import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { SearchUsers } from "./components/SearchUsers/SearchUsers";

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
                <Route index element={<SearchUsers/>}/>
                <Route path='user/:login' element={<div>User login</div>}/>
            </Route>
        </Routes>
        /* <div className='App'>
            {/!* <header className='App-header'>
                 <h1>Github Searcher</h1>
             </header>*!/}
             <div className='container'>
                 <SearchFieldContainer/>
                 <UsersContainer/>
             </div>

         </div>*/
    );
}

export { App };
