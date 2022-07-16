import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../api/api";
import { IRepository, IUser } from "../types";


interface IMainState {
    isLoading: boolean;
    isLoadMore: boolean;
    isLoadMoreRepos: boolean;
    reposCurrentPage: number;
    reposCount: number;
    totalReposCount: number;
    error: string | null;
    userCurrentPage: number;
    totalUserCount: number;
    usersSearchValue: string;
    reposSearchValue: string;
    filteredRepos: IRepository[];
    repos: IRepository[];
    users: IUser[];
    usersCount: number;
}

type GetUsersThunkType = {
    users: IUser[];
    totalCount: number;
}

type RequestsDataRepos = {
    login: string;
    page?: number;
}

type RequestsDataUsers = {
    searchValue: string;
    page?: number;
}

export const getUsers = createAsyncThunk<GetUsersThunkType, RequestsDataUsers, { rejectValue: string }>(
    'main/getUsers',
    async (searchData, { rejectWithValue }) => {
        const { searchValue, page } = searchData;
        const response = await Api.searchUsers(searchValue, page);
        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }
        const foundUsers = response.data.items;
        const totalCount = response.data.total_count;
        const users = await Promise.all(foundUsers.map(async (user: any) => {
            const response = await Api.getUserInfoByLogin(user.login);
            const {
                id, avatar_url, followers, following,
                location, name, login, public_repos,
                email, created_at, bio
            } = response.data;
            return {
                id, avatar_url, followers, following,
                location, name, login, public_repos,
                email, created_at, bio
            }
        }));
        return { users, totalCount } as GetUsersThunkType;
    }
);

export const loadMoreUsers = createAsyncThunk<GetUsersThunkType, RequestsDataUsers, { rejectValue: string }>(
    'main/loadMoreUsers',
    async (searchData, { rejectWithValue }) => {
        const { searchValue, page } = searchData;
        const response = await Api.searchUsers(searchValue, page);
        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }
        const foundUsers = response.data.items;
        const totalCount = response.data.total_count;
        const users = await Promise.all(foundUsers.map(async (user: any) => {
            const response = await Api.getUserInfoByLogin(user.login);
            const {
                id, avatar_url, followers, following,
                location, name, login, public_repos,
                email, created_at, bio
            } = response.data;
            return {
                id, avatar_url, followers, following,
                location, name, login, public_repos,
                email, created_at, bio
            }
        }));
        return { users, totalCount } as GetUsersThunkType;
    }
);

export const getRepos = createAsyncThunk<IRepository[], string, { rejectValue: string }>(
    'main/getRepos',
    async (login, { rejectWithValue }) => {

        const response = await Api.getUserReposByLogin(login);
        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }
        const repos = response.data.map((r: any) => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            forks: r.forks,
            stargazers_count: r.stargazers_count
        }));
        return repos as IRepository[];
    }
);

export const loadMoreRepos = createAsyncThunk<IRepository[], RequestsDataRepos, { rejectValue: string }>(
    'main/loadMoreRepos',
    async (reposData, { rejectWithValue }) => {
        const { login, page } = reposData
        const response = await Api.getUserReposByLogin(login, page);
        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }
        const repos = response.data.map((r: any) => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            forks: r.forks,
            stargazers_count: r.stargazers_count
        }));
        return repos as IRepository[];
    }
);

const initialState = {
    isLoading: false,
    isLoadMore: false,
    isLoadMoreRepos: false,
    reposCurrentPage: 1,
    reposCount: 0,
    totalReposCount: 0,
    error: null,
    totalUserCount: 0,
    userCurrentPage: 1,
    usersSearchValue: '',
    reposSearchValue: '',
    filteredRepos: [],
    users: [],
    usersCount: 0,
    repos: []
} as IMainState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = [];
            state.totalUserCount = 0;
        },
        clearRepos: (state) => {
            state.repos = [];
            state.reposCount = 0;
            state.totalReposCount = 0;
            state.reposCurrentPage = 1;
            state.reposSearchValue = '';
        },
        clearFilteredRepos: (state) => {
            state.filteredRepos = [];
        },
        setUsersSearchValue: (state, action) => {
            state.usersSearchValue = action.payload;
        },
        setReposSearchValue: (state, action) => {
            state.reposSearchValue = action.payload;
        },
        setIsLoadRepoMore: (state,action) => {
            state.isLoadMoreRepos = action.payload;
        },
        setTotalRepos: (state,action) => {
            state.totalReposCount = action.payload;
        },
        setFilteredRepos: (state, action) => {
            state.filteredRepos = action.payload;
        },
        setIsLoadMore: (state, action) => {
            state.isLoadMore = action.payload;
        },
        setUserCurrentPage: (state) => {
            state.userCurrentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.userCurrentPage = 1;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.totalUserCount = action.payload.totalCount;
                state.usersCount = state.users.length;
                state.isLoading = false;
                state.error = null;
                state.userCurrentPage += 1;
            })
            .addCase(loadMoreUsers.fulfilled, (state, action) => {
                state.users = [...state.users, ...action.payload.users];
                state.isLoadMore = false;
                state.usersCount = state.users.length;
                state.error = null;
                state.userCurrentPage += 1;
            })
            .addCase(getRepos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRepos.fulfilled, (state, action) => {
                state.repos = action.payload;
                state.reposCount = state.repos.length;
                state.isLoading = false;
                state.reposCurrentPage +=1;
                state.error = null;
            })
            .addCase(loadMoreRepos.pending, (state) => {
                state.reposCurrentPage +=1;
            })
            .addCase(loadMoreRepos.fulfilled, (state, action) => {
                state.repos = [...state.repos, ...action.payload];
                state.reposCount = state.repos.length;
                state.isLoadMoreRepos = false;
                state.error = null;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload ? action.payload : 'Some error server';
                state.isLoading = false;
            })
    }
});

const isError = (action: AnyAction) => action.type.endsWith('rejected');

export const {
    setUsersSearchValue, setIsLoadMore, setReposSearchValue, setFilteredRepos, setIsLoadRepoMore, setTotalRepos,
    clearUsers, clearRepos, clearFilteredRepos, setUserCurrentPage
} = mainSlice.actions;
export default mainSlice.reducer;


