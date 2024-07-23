import React from "react";
import AdminLayout from "./AdminLayout";
import Container from "../../components/Container";
import SuperUsers from "../layouts/SuperUsers";

const AdminSuperUsers: React.FC = () => {
  return (
    <AdminLayout active="super users">
      <Container>
        <SuperUsers />
      </Container>
    </AdminLayout>
  );
};

export default AdminSuperUsers;
