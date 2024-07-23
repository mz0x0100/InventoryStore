import { HTMLProps } from "react";
import DashboardItems from "../../components/dashboard/DashboardItems";
import { Text } from "../../components/Text";

interface Props extends HTMLProps<HTMLDivElement> {
  active: string;
}
const dashItems = [
  { text: "Products", iconclass: "fa-cube", linkTo: "/admin/products" },
  {
    text: "Categories",
    iconclass: "fa-tags",
    linkTo: "/admin/categories",
  },
  {
    text: "Suppliers",
    iconclass: "fa-truck",
    linkTo: "/admin/suppliers",
  },
  // {
  //   text: "Report",
  //   iconclass: "fa-bar-chart",
  //   linkTo: "/admin/report",
  // },
  {
    text: "Sing out",
    iconclass: "fa-sign-out",
    linkTo: "/u/logout",
    hrBreak: true,
  },
];

const AdminLayout: React.FC<Props> = ({ active, children }) => {
  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <div className="hidden md:block h-full bg-gray-200 overflow-y-auto min-w-[280px] h-screen">
        <Text className="flex text-white text-xl bg-secondary font-weight-700 py-4 px-2 md:py-8">
          {/* <img src="../../../polylogo.jpg" alt="" width={40} height={40} /> */}
          Admin Dashboard
        </Text>
        <DashboardItems active={active} dashItems={dashItems} />
      </div>
      <div className="overflow-auto w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
