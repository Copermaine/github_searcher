import axios, { AxiosInstance } from "axios";


const instance: AxiosInstance = axios.create({
    //baseURL: 'https://api.github.com/',
    baseURL: process.env.REACT_APP_GITHUB_BASE_URL,
    headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`
        //Authorization: 'token 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'
    }
});

export const Api = {
    searchUsers: async (searchValue: string, page: number = 1) => {
        return await instance.get(`search/users?q=${searchValue}&per_page=30&page=${page}`);
    },
    getUserInfoByLogin: async (userLogin: string) => {
        return await instance.get(`users/${userLogin}`);
    },
    getUserReposByLogin: async (login: string, page: number = 1) => {
        return await instance.get(`users/${login}/repos?per_page=10&page=${page}`);
    }
};