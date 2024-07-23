import React from "react";
import AdminLayout from "./AdminLayout";
import Container from "../../components/Container";
import SuperUser from "../layouts/SuperUser";

const AdminSuperUser: React.FC = () => {
  return (
    <AdminLayout active="super users">
      <Container>
        <SuperUser />
      </Container>
    </AdminLayout>
  );
};

export default AdminSuperUser;
