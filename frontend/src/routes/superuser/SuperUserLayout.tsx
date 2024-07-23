import { HTMLProps, useEffect, useState } from "react";
import DashboardItems, {
  DashboardItemsType,
} from "../../components/dashboard/DashboardItems";
import { Text } from "../../components/Text";
import { useCurrentUser } from "../../utils/contexts/CurrentUserContext";
import { SuType } from "../layouts/SuperUsers";

interface Props extends HTMLProps<HTMLDivElement> {
  active: string;
}

const SuperUserLayout: React.FC<Props> = ({ active, children }) => {
  const { currentUser } = useCurrentUser();
  const [dashItems, setDashItems] = useState<DashboardItemsType[]>([]);

  const mapToDashboardItems = (su: SuType) => {
    const list: DashboardItemsType[] = [];
    su.has_staffs_access &&
      list.push({ text: "Staffs", iconclass: "fa-user", linkTo: "/su/staffs" });
    su.has_schools_access &&
      list.push({
        text: "Schools",
        iconclass: "fa-home",
        linkTo: "/su/schools",
      });
    su.has_forms_access &&
      list.push({ text: "Forms", iconclass: "fa-user", linkTo: "/su/forms" });
    su.has_mail_access &&
      list.push({
        text: "Send Mail",
        iconclass: "fa-user",
        linkTo: "/su/send_mail",
      });
    su.has_sms_access &&
      list.push({
        text: "Send SMS",
        iconclass: "fa-user",
        linkTo: "/su/send_sms",
      });

    list.push({
      text: "Sign out",
      iconclass: "fa-sign-out",
      linkTo: "/u/logout",
      hrBreak: true,
    });
    return list;
  };
  useEffect(() => {
    if (currentUser?.role === "superuser") {
      const su: SuType = currentUser.currentUser;
      setDashItems(mapToDashboardItems(su));
    }
  }, [currentUser]);

  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <div className="hidden md:block h-full bg-secondary overflow-y-auto min-w-[300px] h-screen">
        <Text className="text-white text-xl font-weight-700 p-4 md:p-8">
          Super User Dashboard
        </Text>
        <DashboardItems active={active} dashItems={dashItems} />
      </div>
      <div className="overflow-auto w-full">{children}</div>
    </div>
  );
};

export default SuperUserLayout;
