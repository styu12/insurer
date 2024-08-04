import { LazyLoadRetryOnce } from "../_app/components/lazyload/LazyLoad";

export const authPaths = {
    login: {
        id: 'login',
        path: '/login',
        element: LazyLoadRetryOnce(() => import('./pages/PageAuthLogin')),
    },
    // register: '/auth/register',
    // logout: '/auth/logout',
    // profile: '/auth/profile',
}