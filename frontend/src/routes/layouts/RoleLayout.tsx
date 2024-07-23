import { ReactNode, useState } from "react";
import Container from "../../components/Container";
import { useCurrentUser } from "../../utils/contexts/CurrentUserContext";
import AdminLayout from "../admin/AdminLayout";
import StaffsData from "./StaffsData";
import SuperUserLayout from "../superuser/SuperUserLayout";
import FormTemplates from "../FormTemplates";
import Mailer from "./Mailer";
import SMSender from "./SMSender";
import SchoolsData from "./Categories";
import Products from "./Products";

const RoleLayout: React.FC<{
  layoutFor: "staffs" | "schools" | "forms" | "sms" | "mail";
}> = ({ layoutFor }) => {
  const { currentUser } = useCurrentUser();
  const [showDashItems, setShowDashItems] = useState(false);
  let children: ReactNode = <Products />;

  // switch (layoutFor) {
  //   case "forms":
  //     children = <FormTemplates />;
  //     break;
  //   case "mail":
  //     children = <Mailer />;
  //     break;
  //   case "sms":
  //     children = <SMSender />;
  //     break;
  //   case "staffs":
  //     children = <StaffsData />;
  //     break;
  //   case "schools":
  //     children = <SchoolsData />;
  //     break;

  //   default:
  //     break;
  // }

  return currentUser?.role === "admin" ? (
    showDashItems && (
      <AdminLayout
        active={
          layoutFor === "mail" || layoutFor === "sms"
            ? `send ${layoutFor}`
            : layoutFor
        }
      >
        <Container>
          <Products />
        </Container>
      </AdminLayout>
    )
  ) : (
    <SuperUserLayout active={layoutFor}>
      <Container>{children}</Container>
    </SuperUserLayout>
  );
};

export default RoleLayout;
