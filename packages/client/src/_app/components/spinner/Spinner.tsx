import classNames from 'classnames'
const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames('flex items-center justify-center mt-8', className)}
    >
      <div
        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
export default Spinner
