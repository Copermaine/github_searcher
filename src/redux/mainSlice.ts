import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../api/api";

interface IMainState {
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    searchValue: string;
    users: IUser[];
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
    created_at: Date | null;
    bio: string | null;
}

interface IGetUsers {
    users: IUser[];
    totalCount: number;
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
)

const initialState = {
    isLoading: false,
    error: null,
    totalCount: 0,
    searchValue: '',
    users: []
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
    }
})

export const { clearUsers, setSearchValue } = mainSlice.actions;
export default mainSlice.reducer;

