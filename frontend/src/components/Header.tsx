import TopNav from "./TopNav";
import { navItems } from "../App";

interface Props {
  activeId: number;
}
const Header: React.FC<Props> = ({ activeId }) => {
  return (
    <header className="relative">
      <TopNav navItems={navItems} active={activeId} navColor="nav-bg" />
    </header>
  );
};

export default Header;
