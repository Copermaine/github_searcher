import React from "react";
import styles from "./Repo.module.scss";

type RepoType = {
    name: string;
    html_url: string;
    forks: number;
    stargazers_count: number;
}

const Repo: React.FC<RepoType> = ({ name, html_url, forks, stargazers_count }) => {
    return (
        <div className={styles.repo}>
            <div className={styles.repo_name}>
                <h4>Repository name:</h4>
                <a target='_blank' href={html_url}><h3>{name}</h3></a>
            </div>
            <div className={styles.repo_stars}>
                <h4>{forks} Forks</h4>
                <h4>{stargazers_count} Stars</h4>
            </div>
        </div>
    );
};

export { Repo };
