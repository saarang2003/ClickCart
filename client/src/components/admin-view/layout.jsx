import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./Header";
import { useState } from "react";
;

function AdminLayout() {

  const [openSidebar ,setOpenSidebar] = useState(false);
 
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;