import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement>  {
  navColor?: string
}
const Navbar: React.FC<Props> = ({
  navColor,
  className,
  ...props
}) => {

  const classNames = `z-index-1 md:opacity-90 min-w-full p-0 top-0 fixed ${navColor}`;
  return <div className={classNames}>{props.children}</div>;
};

export default Navbar;
