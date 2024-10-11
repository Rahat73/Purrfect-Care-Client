"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { BsFilePostFill } from "react-icons/bs";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import Contents from "./_component/contents/contents";
import Users from "./_component/users/users";
import PaymentHistory from "./_component/payments-history/payments-history";

const AdminDashboard = () => {
  return (
    <section>
      <p className="text-center text-2xl underline underline-offset-8">
        Admin Dashboard
      </p>
      <div className="flex w-full flex-col my-10">
        <Tabs aria-label="Options" placement="top">
          <Tab
            key="content"
            title={
              <div className="flex gap-2 justify-center items-center">
                <BsFilePostFill />
                Contents
              </div>
            }
          >
            <Contents />
          </Tab>
          <Tab
            key="Users"
            title={
              <div className="flex gap-2 justify-center items-center">
                <FaUsers />
                Users
              </div>
            }
          >
            <Users />
          </Tab>
          <Tab
            key="Payments"
            title={
              <div className="flex gap-2 justify-center items-center">
                <FaDollarSign />
                Payments
              </div>
            }
          >
            <PaymentHistory />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default AdminDashboard;
