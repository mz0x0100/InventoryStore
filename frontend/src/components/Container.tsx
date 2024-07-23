
import { HTMLProps } from "react"

const Container: React.FC<HTMLProps<HTMLDivElement>> = ({ className, children, ...props }) => {
  const classNames = `${className} p-2 md:p-8 w-full h-full`;
  return (
    <div className={classNames} {...props}>
        { children }
    </div>
  );
}

export default Container;