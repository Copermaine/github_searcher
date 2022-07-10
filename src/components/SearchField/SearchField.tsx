import React from "react";
import styles from "./SearchField.module.scss";


type SearchFieldType = {
    value: string;
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SearchField: React.FC<SearchFieldType> = ({ value, changeValue, placeholder }) => {

    return <input className={styles.text_field}
                  type='text'
                  placeholder={placeholder}
                  value={value}
                  onChange={changeValue}/>
};

export { SearchField };