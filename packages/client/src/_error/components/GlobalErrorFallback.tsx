const GlobalErrorFallback = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          알수 없는 에러가 발생했어요
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          죄송합니다. 페이지를 로드하는 동안 문제가 발생했습니다. 잠시 후 다시
          시도해 주세요.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </main>
  )
}
export default GlobalErrorFallback
