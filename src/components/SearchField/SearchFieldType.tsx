import React from "react";
import styles from "./SearchField.module.scss";


type SearchFieldType = {
    value: string
    changeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchField: React.FC<SearchFieldType> = ({ value, changeSearchValue }) => {
    return <input className={styles.text_field}
                  type='text' name='search'
                  placeholder='Search for Users'
                  value={value}
                  onChange={changeSearchValue}/>
};

export default SearchField;