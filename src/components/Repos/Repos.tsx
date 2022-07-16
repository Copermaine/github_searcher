import React from "react";
import { useAppDispatch } from "../../hooks";
import { Repo } from "../Repo/Repo";
import { setIsLoadRepoMore } from "../../redux/mainSlice";
import { useInView } from "react-intersection-observer";
import { IRepository } from "../../types";


type ReposPropsType = {
    filteredRepos: IRepository[];
    totalReposCount: number;
    reposCount: number;
    isLoadMoreRepos: boolean;
    isLoading: boolean;
}

const Repos: React.FC<ReposPropsType> = (props) => {
    const { reposCount, totalReposCount, filteredRepos, isLoadMoreRepos, isLoading} = props;

    const dispatch = useAppDispatch();

    //Intersection Observer hook
    const { ref: myRef, inView } = useInView();

    React.useEffect(() => {
        if (reposCount < totalReposCount) {
            dispatch(setIsLoadRepoMore(inView));
        }
    }, [inView]);

    return (
        <div>
            {
                filteredRepos.map(repo => (
                    <Repo key={repo.id} name={repo.name} forks={repo.forks}
                          stargazers_count={repo.stargazers_count} html_url={repo.html_url}/>
                ))
            }
            <div ref={myRef}/>
            {
                isLoadMoreRepos && <h2>Load more repos...</h2>
            }
            <h2>{inView}</h2>
        </div>
    );
};

export { Repos };
