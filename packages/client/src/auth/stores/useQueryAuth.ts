import { useSuspenseQuery } from "@tanstack/react-query"
import { authService } from "../services/authService"

/**
 * 프로필 조회
 */
export const useSuspenseQueryGetProfile = () => {
    const service = authService()

    return useSuspenseQuery({
        queryKey: ['get-profile'],
        queryFn: () => {
            return service.getProfile()
        },
    })
}

/**
 * 로그인 상태 조회
 */
export const useSuspenseQueryIsLoggedIn = () => {
    const service = authService()

    return useSuspenseQuery({
        queryKey: ['is-logged-in'],
        queryFn: () => {
            return service.isLoggedIn()
        },
    })
}
