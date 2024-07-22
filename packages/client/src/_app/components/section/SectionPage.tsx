import type { PropsWithChildren } from 'react'

interface SectionPageProps extends PropsWithChildren {}
const SectionPage = (props: SectionPageProps) => {
  return <div className="lg:flex lg:h-full lg:flex-col">{props.children}</div>
}
export default SectionPage
