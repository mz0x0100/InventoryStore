import React from 'react'

const Anchor = ({className, ...props}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  return (
    <a {...props}>
        {props.children}
    </a>
  )
}

export default Anchor