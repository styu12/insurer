import classNames from 'classnames'

interface SplitVeritcalProps {
  className?: string
}
const BASE_STYLE = ['w-px', 'bg-gray-300', 'h-6']

const SplitVeritcal = (props: SplitVeritcalProps) => {
  return <div className={classNames(BASE_STYLE, props.className)} />
}
export default SplitVeritcal
