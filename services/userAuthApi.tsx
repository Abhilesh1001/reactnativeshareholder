// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseurl } from '../app/alldata/basedata'
import { useSelector } from 'react-redux'
import { StateProps } from '../type/user'


// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'cus/authreg/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }

            }
        }),
        getPerson: builder.query({
            query: (id) => {
                const {authToken} = useSelector((state:StateProps)=>state.counter)
                 return {
                    url: `loan/person/${id}`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${authToken?.access}`
                    }
                }

            }
        }),



    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation,useGetPersonQuery } = userAuthApi