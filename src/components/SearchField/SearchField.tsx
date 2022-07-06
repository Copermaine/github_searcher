import React from "react";
import styles from "./SearchField.module.scss";
import { clearUsers } from "../../redux/mainSlice";

type SearchField = {
    value: string
    changeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchField: React.FC<SearchField> = ({value, changeSearchValue}) => {

    return (
        <div className={styles.text_field}>
            {/*<label htmlFor='search'>Search for Users</label>*/}
            <input type='text' name='search' placeholder='Search for Users'
                   value={value}
                   onChange={changeSearchValue}/>
        </div>
    );
};

export default SearchField;
