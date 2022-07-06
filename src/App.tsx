import React from "react";
import "./App.scss";
import Users from "./components/Users/Users";
import { Api } from "./api/api";

const App = () => {
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
        <div className='App'>
            <header className='App-header'>
                <h3>github searcher</h3>
            </header>
            <div className='container'>
                <Users/>
                {/*<button onClick={()=>Api.getCode()}>autorize</button>
                <button onClick={()=>Api.autorizeWithcCode()}>get Acsses token</button>*/}
            </div>

        </div>
    );
}

export default App;
