import axios, { AxiosInstance } from "axios";


const instance: AxiosInstance = axios.create({
    //baseURL: 'https://api.github.com/',
    baseURL: process.env.REACT_APP_GITHUB_BASE_URL,
    headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`
        //Authorization: 'token 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'
    }
});

/*
export const Api = {
    searchUsers: async (searchValue: string = '', page: number = 1) => {
        try {
            const response = await instance.get(`search/user?q=${searchValue}&per_page=30&page=${page}`);
            if(response.status !== 200) {
                throw new Error('Server error')
            }

            const foundUsers = response.data.items;
            const totalCount = response.data.total_count;
            const usersInfoByLogin = await foundUsers.map(({ login }: any) => Api.getUserInfoByLogin(login));

            const users = await Promise.all(usersInfoByLogin);
            return { users, totalCount }
        } catch (e) {
            if (e instanceof Error) {
                //console.error(e.message);
                return e
            }
        }
    },
    getUserInfoByLogin: async (userLogin: string) => {
        try {
            const response = await instance.get(`users/${userLogin}`);

             const { id, avatar_url, followers, following,
                    location, name, login, public_repos,
                    email, created_at, bio } = response.data;

            return { id, avatar_url, followers, following,
                    location, name, login, public_repos,
                    email, created_at, bio }
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    },

    getUserReposByLogin: async (login: string = '') => {
        try {
            const response = await instance.get(`users/${login}/repos`);
            const repos = response.data.map((r: any) => ({
                id: r.id,
                name: r.name,
                html_url: r.html_url,
                forks: r.forks,
                stargazers_count: r.stargazers_count
            }));
            return repos;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }
};*/


export const Api = {
    searchUsers: async (searchValue: string, page: number = 1) => {
        return await instance.get(`search/users?q=${searchValue}&per_page=30&page=${page}`);
    },
    getUserInfoByLogin: async (userLogin: string) => {
        return await instance.get(`users/${userLogin}`);
    },
    getUserReposByLogin: async (login: string = '', page: number = 1) => {
        return await instance.get(`users/${login}/repos?per_page=10&page=${page}`);
    }
};