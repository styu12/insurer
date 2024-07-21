import { Link } from 'react-router-dom'

const PageErrorFallback = () => {
  return (
    <div className="text-center">
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        화면 불러오는데 실패했어요
      </h2>
      <p className="mt-6 text-base leading-7 text-gray-600">
        죄송합니다. 화면을 로드하는 동안 문제가 발생했습니다. 해당 문제가
        지속되면 관리자에게 문의해주세요.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default PageErrorFallback
