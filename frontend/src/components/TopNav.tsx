import { useState } from "react";
import NavItem from "./NavItem";
import NavItems from "./NavItems";
import Navbar from "./Navbar";
import Overlay from "./Overlay";

export type NavItemType = { text: string; linkTo: string };

interface Props {
  navItems: Array<NavItemType>;
  active: number;
  navColor?: string;
}

const TopNav: React.FC<Props> = ({ navColor, navItems, active }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <Navbar navColor={navColor}>
      <NavItems className="flex relative p-2">
        <h2 className="text-3xl p-2 nav-text font-weight-900">EMIS</h2>
        <i
          className="absolute right-2 p-4 fa fa-lg fa-navicon nav-text cursor-pointer block md:hidden"
          onClick={handleShow}
        ></i>
        <div className="hidden ml-auto md:flex">
          {navItems.map((navItem, key) => (
            <NavItem
              linkTo={navItem.linkTo}
              key={key}
              children={navItem.text}
              className={`ml-6 p-4 cursor-pointer nav-text hover:border-b-2 hover:opacity-60 border-primary ${
                active == key && " border-b-2"
              }`}
            />
          ))}
        </div>
      </NavItems>

      {/* Modle navbar */}
      {show && (
        <Overlay className="my-overlay">
          <NavItems className="fixed overflow-scroll slide-right right-0 mx-auto theme-bg min-w-[300px] h-full p-4">
            <i
              className="absolute right-5 fa fa-lg fa-times block top-2 cursor-pointer nav-text"
              title="Close"
              onClick={handleShow}
            ></i>
            {navItems.map((navItem, key) => (
              <NavItem
                linkTo={navItem.linkTo}
                children={navItem.text}
                key={key}
                className={`p-4 mt-4 cursor-pointer hover:opacity-70 hover:bg-[rgba(0,0,0,0.3)] ${
                  active == key && " bg-[rgba(0,0,0,0.3)]"
                }`}
              />
            ))}
          </NavItems>
        </Overlay>
      )}
    </Navbar>
  );
};

export default TopNav;
