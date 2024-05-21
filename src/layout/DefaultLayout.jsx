import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div>
      {/* main div */}
      <div className="flex h-screen w-full ">
        {/* side bar  left*/}
        <div className=" overflow-hidden h-full w-1/5">
          <p className="mx-auto my-auto">
            <Sidebar />
          </p>
        </div>
        {/* sidebar end  */}
        <div className=" pl-[0.5px]  bg-background flex flex-col  overflow-y-scroll w-4/5">
          {/* uperbar right side */}
          <div className=" p-4 bg-white  sticky top-0">
            <p className="mx-auto  my-auto w-full">
              <Header />
            </p>
          </div>
          {/* uperbar end */}

          {/* right bottom part */}
          <div className="flex p-5 w-full">
            <div>
              <p className="mx-auto ">
                <Outlet />
              </p>
            </div>
          </div>
          {/* right bottom part end  */}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
