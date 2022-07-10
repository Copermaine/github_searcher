import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../api/api";


interface IMainState {
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    usersSearchValue: string;
    reposSearchValue: string;
    filteredRepos: IRepository[];
    users: IUser[];
    repos: IRepository[];
}

export interface IUser {
    id: number | null;
    avatar_url: string;
    followers: number;
    following: number;
    location: string | null;
    name: string | null;
    login: string;
    public_repos: number | null;
    email: string | null;
    created_at: string;
    bio: string | null;
}

interface IGetUsers {
    users: IUser[];
    totalCount: number;
}

export interface IRepository {
    id: number;
    name: string;
    html_url: string;
    forks: number;
    stargazers_count: number;
}

export const getUsers = createAsyncThunk<IGetUsers, string, { rejectValue: string }>(
    'main/getUsers',
    async (searchValue, { rejectWithValue }) => {
        try {
            const response = await Api.searchUsers(searchValue);
            return response as IGetUsers;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getRepos = createAsyncThunk<IRepository[], string, { rejectValue: string }>(
    'main/getRepos',
    async (login, { rejectWithValue }) => {
        try {
            const response = await Api.getUserReposByLogin(login);
            return response as IRepository[];
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

const initialState = {
    isLoading: false,
    error: null,
    totalCount: 0,
    usersSearchValue: '',
    reposSearchValue: '',
    filteredRepos: [],
    users: [],
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

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.totalCount = action.payload.totalCount;
                state.isLoading = false;
                state.error = null;

            })
            .addCase(getUsers.rejected, (state) => {
                //state.status = 'rejected';
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
    }
})

export const {
    setUsersSearchValue,
    setReposSearchValue, setFilteredRepos,
    clearUsers, clearRepos, clearFilteredRepos
} = mainSlice.actions;
export default mainSlice.reducer;

