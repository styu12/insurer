import { useMutation } from "@tanstack/react-query"
import { authService } from "../services/authService"
import { ApiV1UsersLoginPostRequest, ApiV1UsersRegisterPostRequest } from "../../__codegen__/__openapi__/insurer-server"

/**
 * 회원가입
 */
export const useMutationRegister = () => {
    const service = authService()

    return useMutation({
        mutationFn: (payload: ApiV1UsersRegisterPostRequest) => {
            return service.register({ payload })
        }
    })
}

/**
 * 로그인
 */
export const useMutationLogin = () => {
    const service = authService()

    return useMutation({
        mutationFn: (payload: ApiV1UsersLoginPostRequest) => {
            return service.login({ payload })
        }
    })
}

/**
 * 로그아웃
 */
export const useMutationLogout = () => {
    const service = authService()

    return useMutation({
        mutationFn: () => {
            return service.logout()
        }
    })
}