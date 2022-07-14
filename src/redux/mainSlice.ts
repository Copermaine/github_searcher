import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../api/api";
import { IRepository, IUser } from "../types";


interface IMainState {
    isLoading: boolean;
    isLoadMore: boolean;
    error: string | null;
    userCurrentPage: number;
    totalCount: number;
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

type SearchDataThunkType = {
    searchValue: string;
    page?: number;
}

export const getUsers = createAsyncThunk<GetUsersThunkType, SearchDataThunkType, { rejectValue: string }>(
    'main/getUsers',
    async (searchData, { rejectWithValue }) => {
        const { searchValue, page } = searchData;
        const response = await Api.searchUsers(searchValue, page);
        if (response.status !== 200) {
            console.log(response)
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

export const loadMoreUsers = createAsyncThunk<GetUsersThunkType, SearchDataThunkType, { rejectValue: string }>(
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

const initialState = {
    isLoading: false,
    isLoadMore: false,
    error: null,
    totalCount: 0,
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
            state.totalCount = 0;
        },
        clearRepos: (state) => {
            state.repos = [];
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
        setFilteredRepos: (state, action) => {
            state.filteredRepos = action.payload;
        },
        setIsLoadMore: (state, action) => {
            state.isLoadMore = action.payload;
        },

        setUserCurrentPage: (state) => {
            state.userCurrentPage = 1;
        },
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
                state.totalCount = action.payload.totalCount;
                state.usersCount = state.users.length;
                state.isLoading = false;
                state.error = null;
                state.userCurrentPage += 1;
            })
            .addCase(loadMoreUsers.fulfilled, (state, action) => {
                //state.users = [...state.users, ...action.payload.users];
                state.users.push(...action.payload.users);
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
                state.isLoading = false;
                state.error = null;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})
const isError = (action: AnyAction) => action.type.endsWith('rejected');

export const {
    setUsersSearchValue, setIsLoadMore, setReposSearchValue, setFilteredRepos,
    clearUsers, clearRepos, clearFilteredRepos, setUserCurrentPage
} = mainSlice.actions;
export default mainSlice.reducer;


