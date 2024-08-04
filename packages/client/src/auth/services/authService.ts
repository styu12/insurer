import to from "await-to-js"
import { ApiV1UsersLoginPost200Response, ApiV1UsersLoginPostRequest, ApiV1UsersRegisterPostRequest, Configuration, User, UserApiFactory } from "../../__codegen__/__openapi__/insurer-server"
import { createRemote } from "../../utils/axios"
import { AxiosResponse } from "axios"

export const authService = () => {
    const remote = createRemote()
    const client = UserApiFactory(new Configuration(), '', remote)

    return {

        /**
         * 회원가입
         */
        register: async ({
            payload
        }: {
            payload: ApiV1UsersRegisterPostRequest
        }) => {
            const [error, resp] = await to<AxiosResponse<User>>(
                client.apiV1UsersRegisterPost(payload)
            )

            if (error) {
                throw error
            }

            return resp?.data ?? null
        },


        /**
         * 로그인
         */
        login: async ({ 
            payload
        }: { 
            payload: ApiV1UsersLoginPostRequest 
        }) => {
            const [error, resp] = await to<AxiosResponse<ApiV1UsersLoginPost200Response>>(
                client.apiV1UsersLoginPost(payload)
            )

            if (error) {
                throw error
            }

            return resp?.data ?? null
        },

        /**
         * 로그아웃
         */
        logout: async () => {
            const [error, resp] = await to(client.apiV1UsersLogoutPost())

            if (error) {
                throw error
            }

            return resp?.data ?? null
        },

        /**
         * 프로필 조회
         */
        getProfile: async () => {
            const [error, resp] = await to<AxiosResponse<User>>(
                client.apiV1UsersMeGet()
            )

            if (error) {
                throw error
            }

            return resp?.data ?? null
        },

        /**
         * 로그인 상태 확인
         */
        isLoggedIn: async () => {
            const [error, resp] = await to(client.apiV1UsersStatusGet())

            if (error) {
                throw error
            }

            return resp?.data ?? null
        }
    }
}