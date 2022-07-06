import axios, { AxiosInstance } from "axios";



const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GITHUB_BASE_URL,
    headers: {
        //Authorization: `token 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`
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`
    }
});

export const Api = {
    searchUsers: async (searchValue: string = '', page: number = 1) => {
        try {
            const response = await instance.get(`search/users?q=${searchValue}&page=${page}&per_page=30`);
            /* if (response.status !== 200) {
                 throw new Error('Some error');
             }*/
            const foundUsers = response.data.items;
            const totalCount = response.data.total_count;
            //console.log(response)
            const usersInfoByLogin = await foundUsers.map(({ login }: any) => Api.getUserInfoByLogin(login));


            //return await Promise.all(usersInfoByLogin);
            const users = await Promise.all(usersInfoByLogin);
            //console.log({ result, totalCount })

            return { users, totalCount }
        } catch (error: any) {
            console.error(error.message);
        }
    },
    getUserInfoByLogin: async (userLogin: string) => {
        try {
            const response = await instance.get(`users/${userLogin}`);

            const {
                id,
                avatar_url,
                followers,
                following,
                location,
                name,
                login,
                public_repos,
                email,
                created_at,
                bio
            } = response.data;
            return {
                id,
                avatar_url,
                followers,
                following,
                location,
                name,
                login,
                public_repos,
                email,
                created_at,
                bio
            }
        } catch (error: any) {
            console.error('Error is:', error.message);
        }

    },

    /*getUserReposByLogin: async (login: string = 'jasonrudolph') => {
        try {
            const response = await instance.get(`users/${login}/repos`);
            if (response.status !== 200) {
                throw new Error('Some error');
            }
            //console.log('repos:', JSON.stringify(response.data[0]))

           return response.data;
        } catch (error: any) {
            console.warn(error.message);
        }
    }*/

   /* getCode: async () => {
        const response = await axios.get('https://github.com/login/oauth/authorize?client_id=fdc6ee5a535291e80ebd')
        console.log(response)
},
    autorizeWithcCode: async () =>{
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: 'fdc6ee5a535291e80ebd',
            client_secret: '5c3664b0eb1ab7ed8ce067ca0cf8751de33d99ac',
            code: '51b0093d6c2febd89395'
        })
        console.log(response)
    }
*/
};
//https://api.github.com/rate_limit
//https://api.github.com/search/users/q=tom+repos:%3E42+followers:%3E1000
//POST https://github.com/login/oauth/access_token
//client_id: fdc6ee5a535291e80ebd
//client_secret: 5c3664b0eb1ab7ed8ce067ca0cf8751de33d99ac