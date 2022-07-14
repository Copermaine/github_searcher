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

export interface IRepository {
    id: number;
    name: string;
    html_url: string;
    forks: number;
    stargazers_count: number;
}