import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { NavItemType } from "./components/TopNav";
import Scroller from "./utils/Scroller";
import Staffs from "./routes/Staffs";
import { useEffect } from "react";
import { isIn } from "./utils/utils";
import { APIRequestErrorNotifier } from "./utils/Notifier";
import { useLoadCurrentUser } from "./utils/apicalls/misc";
import AuthLayer from "./utils/AuthLayer";
import Forbidden from "./routes/Forbidden";
import RoleLayout from "./routes/layouts/RoleLayout";
import LoginView from "./routes/LoginView";
import Page404 from "./routes/Page404";
import Logout from "./routes/Logout";
import { useTheme } from "./utils/contexts/ThemeContext";
import StaffUserProfile from "./routes/staffuser.tsx/StaffUserProfile";
import { useCurrentUser } from "./utils/contexts/CurrentUserContext";
import StaffUpdatePassword from "./routes/staffuser.tsx/StaffUpdatePassword";
import AdminLayout from "./routes/admin/AdminLayout";
import Products from "./routes/layouts/Products";
import Categories from "./routes/layouts/Categories";
import Suppliers from "./routes/layouts/Suppliers";

// For accessing VITE env variables
export const REACT_APP_API_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const navItems: NavItemType[] = [
  { text: "Home", linkTo: "/" },
  { text: "Schools", linkTo: "/schools" },
  { text: "Staffs", linkTo: "/staffs" },
  // { text: "About", linkTo: "#" },
  { text: "Contact", linkTo: "#contact" },
];

const App: React.FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const loadCurrentUser = useLoadCurrentUser();
  const { theme } = useTheme();

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser({
        isAuthenticated: true,
        role: "admin",
        currentUser: "admin",
      });
      return;
      console.log("loading current user");
      loadCurrentUser();
    }
  });
  useEffect(() => {
    // setTheme("light");
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      document.querySelectorAll(".data-container").forEach((item) => {
        if (
          e.target == item ||
          isIn(e.target as EventTarget, item.childNodes)
        ) {
          item.classList.add("border-primary");
        } else {
          item.classList.remove("border-primary");
        }
      });
    };
    document.addEventListener("click", handleEvents);
    document.addEventListener("keyup", handleEvents);

    // loads the current user
    loadCurrentUser();

    // For handling closing popups
    const handleMouseUp = (e: MouseEvent) => {
      document.querySelectorAll(".popup").forEach((popup) => {
        if (
          e.target !== popup &&
          !isIn(e.target as EventTarget, popup.childNodes)
        ) {
          popup.dispatchEvent(new Event("onclosepopup"));
        }
      });
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("click", handleEvents);
      document.removeEventListener("keyup", handleEvents);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={`min-h-screen relative theme-${theme}`}>
      <APIRequestErrorNotifier />
      <Scroller />
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          {/* <Route path="product" Component={AdminLayout} /> */}
          <Route element={<AuthLayer role="admin" />}>
            <Route
              path="/admin/products"
              element={
                <AdminLayout active="products" children={<Products />} />
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminLayout active="categories" children={<Categories />} />
              }
            />
            <Route
              path="/admin/suppliers"
              element={
                <AdminLayout active="suppliers" children={<Suppliers />} />
              }
            />
          </Route>

          <Route path="/forbidden" Component={Forbidden} />

          <Route path="/u/logout" Component={Logout} />
          <Route element={<AuthLayer role="admin" />}>
            <Route
              path="/admin/staffs"
              element={<RoleLayout layoutFor="staffs" />}
            />
          </Route>
          <Route
            path="/admin/login"
            element={<LoginView loginRole="admin" />}
          />
          <Route
            path="/staff/login"
            element={<LoginView loginRole="staffuser" />}
          />
          {/* <Route element={<AuthLayer role="staffuser" />}>
            <Route path="staff/profile" element={<StaffUserProfile />} />
            <Route
              path="staff/update_password"
              element={<StaffUpdatePassword />}
            />
          </Route> */}
          <Route path="/*" Component={Page404} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
