import { ReactNode } from 'react'

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white h-full">
      <div>{children}</div>
    </div>
  )
}
export default AppLayout
