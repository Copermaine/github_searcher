import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { Repo } from "../Repo/Repo";
import { clearFilteredRepos, clearRepos, getRepos, setFilteredRepos } from "../../redux/mainSlice";

const Repos: React.FC = () => {
    const dispatch = useAppDispatch();
    const { login } = useParams();

    const repos = useAppSelector(state => state.main.repos);
    const isLoading = useAppSelector(state => state.main.isLoading);
    const reposSearchValue = useAppSelector(state => state.main.reposSearchValue);
    const filteredRepos = useAppSelector(state => state.main.filteredRepos);

    const filterRepos = (value: string) => {
        let reposArray = [...repos];
        reposArray = reposArray.filter(repo => repo.name.toLowerCase().includes(value.toLowerCase()));
        dispatch(setFilteredRepos(reposArray));
    }

    //todo get repositories
    React.useEffect(() => {
        dispatch(getRepos(login as string));
        return () => {
            dispatch(clearRepos());
        }
    }, []);

    //todo set search value repository
    React.useEffect(() => {
        filterRepos(reposSearchValue);
    }, [reposSearchValue]);

    //todo set and remove filtered repository
    React.useEffect(() => {
        dispatch(setFilteredRepos(repos));
        return ()=> {
            dispatch(clearFilteredRepos());
        }
    }, [repos]);


    if (isLoading) {
        return <div>...Loading repos</div>
    }
    return (
        <>
            {
                filteredRepos.map(repo => (
                    <Repo key={repo.id} name={repo.name} forks={repo.forks}
                          stargazers_count={repo.stargazers_count} html_url={repo.html_url}/>
                ))
            }
        </>
    );
};

export { Repos };
