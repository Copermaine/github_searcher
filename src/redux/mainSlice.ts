import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Api } from "../api/api";

interface IMainState {
    isLoading: boolean
    error: string | null
    searchValue: string
    users: IUser[]
}

interface IUser {
    id: number | null
    avatar_url: string
    followers: number
    following: number
    location: string | null
    name: string | null
    login: string | null
    public_repos: number | null
    email: string | null
    created_at: Date | null
    bio: string | null
}


export const getUsers = createAsyncThunk<IUser[], string, {rejectValue: string}>(
    'main/getUsers',
    async (searchValue, {rejectWithValue}) => {
        try {
            const response = await Api.searchUsers(searchValue)
            return (response) as IUser[]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    isLoading: false,
    error: null,
    searchValue: '',
    users: [
        /*{
            id: null,
            avatar_url: undefined,
            followers: 0,
            following: 0,
            location: null,
            name: null,
            login: null,
            public_repos: null,
            email: null,
            created_at: null,
            bio: null
        }*/
    ]
} as IMainState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = [];
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
                state.users = action.payload;
                state.isLoading = false;
                state.error = null;

            })
            .addCase(getUsers.rejected, (state) => {
                //state.status = 'rejected';
            })
    }
})

export const {clearUsers} = mainSlice.actions
export default mainSlice.reducer

