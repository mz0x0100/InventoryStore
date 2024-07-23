import { useEffect, useState } from "react";
import { useScroll } from "./contexts/ScrollContext";
import { useTheme } from "./contexts/ThemeContext";

const Scroller = () => {
  const { setScroll } = useScroll();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);

      /**
       * If the current scroll is greater than the visual screen viewport height (VH)
       * setShow to true to display scroll to top
       */
      window.scrollY > (window.visualViewport?.height as number)
        ? setShow(true)
        : setShow(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { theme } = useTheme();
  const themeBg = theme == "classic" ? "theme-bg" : "bg-primary";

  return (
    <>
      {show && (
        <div
          title="Scroll to top"
          className={`fixed z-index-6 right-2 bottom-2 p-4 ${themeBg} rounded-xl hover:opacity-90 cursor-pointer`}
          onClick={handleClick}
        >
          <i className="fa fa-arrow-up fa-2xl text-gray-600"></i>
        </div>
      )}
    </>
  );
};

export default Scroller;
