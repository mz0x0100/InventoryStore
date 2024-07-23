import { HTMLProps } from "react"

const NavItems: React.FC<HTMLProps<HTMLUListElement>> = ({ className, ...props }) => {
    
  const classNames = `${className}`
    return <ul className={classNames} {...props} ></ul>
}

export default NavItems;