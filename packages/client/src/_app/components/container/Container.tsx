import { ElementType, PropsWithChildren } from 'react'

type ContainerAs =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'header'
  | 'footer'
  | 'nav'

interface ContainerProps extends PropsWithChildren {
  as?: ContainerAs
  key?: string
  className?: string
}
export const Container = (props: ContainerProps) => {
  const { as = 'div' } = props
  const Component = as as ElementType
  return (
    <Component key={props.key ?? as} className={props.className}>
      {props.children}
    </Component>
  )
}
