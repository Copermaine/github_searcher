import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../api/api";

interface IMainState {
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    searchValue: string;
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
    login: string | null;
    public_repos: number | null;
    email: string | null;
    //created_at: Date | null;
    created_at: string;
    bio: string | null;
}

interface IGetUsers {
    users: IUser[];
    totalCount: number;
}

interface IRepository {
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
            console.log(response)
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
    searchValue: '',
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
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        }
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

export const { clearUsers, setSearchValue } = mainSlice.actions;
export default mainSlice.reducer;

