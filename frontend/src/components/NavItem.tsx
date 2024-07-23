import { Link } from "react-router-dom";

interface Props {
  linkTo: string;
  className?: string;
  children?: string;
}

const NavItem: React.FC<Props> = ({ linkTo, className, children }) => {
  const textClasses = `text-gray-700 text-sm font-weight-600`;

  return (
    <Link to={linkTo}>
      <li className={`${className} ${textClasses}`}>
        {children}
      </li>
    </Link>
  );
};

export default NavItem;
