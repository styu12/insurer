import { Suspense } from "react"
import FormAuth from "../components/FormAuth"
import { useSuspenseQueryIsLoggedIn } from "../stores/useQueryAuth"
import { ErrorBoundary } from "react-error-boundary"

const PageAuthLogin = () => {
    
    return (
        <ErrorBoundary fallback={<FormAuth />}>
            <Suspense fallback={<>loading..</>}>
                <Auth />
            </Suspense>
        </ErrorBoundary>
    )
}

const Auth = () => {
    const _ = useSuspenseQueryIsLoggedIn()
    return <></>
}

export default PageAuthLogin