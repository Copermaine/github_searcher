import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { clearFilteredRepos, clearRepos, getRepos, loadMoreRepos, setFilteredRepos } from "../../redux/mainSlice";
import { Repos } from "./Repos";


const ReposContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { login } = useParams();

    const isLoading = useAppSelector(state => state.main.isLoading);
    const isLoadMoreRepos = useAppSelector(state => state.main.isLoadMoreRepos);

    const repos = useAppSelector(state => state.main.repos);

    const reposSearchValue = useAppSelector(state => state.main.reposSearchValue);
    const filteredRepos = useAppSelector(state => state.main.filteredRepos);

    const reposCurrentPage = useAppSelector(state => state.main.reposCurrentPage);
    const totalReposCount = useAppSelector(state => state.main.totalReposCount);
    const reposCount = useAppSelector(state => state.main.reposCount);

    const err = useAppSelector(state => state.main.error);

    //function for filtering repos array
    const filterRepos = (value: string) => {
        let reposData = [...repos];
        reposData = reposData.filter(repo => repo.name.toLowerCase().includes(value.toLowerCase()));
        dispatch(setFilteredRepos(reposData));
    }

    React.useEffect(() => {
        if (reposCurrentPage === 1) {
            dispatch(getRepos(login as string));
        }
        return () => {
            dispatch(clearRepos());
            dispatch(clearFilteredRepos());
        }
    }, []);

    React.useEffect(() => {
        dispatch(setFilteredRepos(repos));
    }, [repos]);

    React.useEffect(() => {
        if (reposCount < totalReposCount && reposCurrentPage > 1) {
            dispatch(loadMoreRepos({ login: login as string, page: reposCurrentPage }));
        }
    }, [isLoadMoreRepos]);

    React.useEffect(() => {
        filterRepos(reposSearchValue);
    }, [reposSearchValue]);

    if (isLoading) {
        return <h2>...Loading repos</h2>
    }

    return (
        <>
            {
                err
                    ? <h2>{err}</h2>
                    : <Repos filteredRepos={filteredRepos} reposCount={reposCount} isLoading={isLoading}
                             totalReposCount={totalReposCount} isLoadMoreRepos={isLoadMoreRepos}/>

            }
        </>
    );
};

export { ReposContainer };
