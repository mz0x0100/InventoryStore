import { HTMLProps } from "react";
import DashboardItems from "../../components/dashboard/DashboardItems";
import { Text } from "../../components/Text";

interface Props extends HTMLProps<HTMLDivElement> {
  active: string;
}
const dashItems = [
  { text: "Profile", iconclass: "fa-user-circle", linkTo: "/staff/profile" },
  { text: "Notifications", iconclass: "fa-bell", linkTo: "/staff/profile" },
  // { text: "Settings", iconclass: "fa-gear", linkTo: "/staff/settings" },
  { text: "Sing out", iconclass: "fa-sign-out", linkTo: "/u/logout" },
];

const StaffUserLayout: React.FC<Props> = ({ active, children }) => {
  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <div className="hidden md:block h-full bg-secondary overflow-y-auto min-w-[300px] h-screen">
        <Text className="text-white text-xl font-weight-700 p-4 md:p-8">
          Staff Dashboard
        </Text>
        <DashboardItems active={active} dashItems={dashItems} />
      </div>
      <div className="overflow-auto w-full">{children}</div>
    </div>
  );
};

export default StaffUserLayout;
