import { lazy } from "react";
const SuperAdmin = lazy(() => import("../pages"));
const UserList = lazy(() => import("../pages/UserList"));
const TaskList = lazy(() => import("../pages/TaskList"));
const Notification = lazy(() => import("../pages/Notification"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const coreRoutes = [
  {
    path: "/",
    title: "super-admin",
    component: SuperAdmin,
  },
  {
    path: "/users",
    title: "usersList",
    component: UserList,
  },
  {
    path: "/tasks",
    title: "taskList",
    component: TaskList,
  },
  {
    path: "/notifications",
    title: "notifications",
    component: Notification,
  },
  {
    path: "*",
    title: "Page NOT Found",
    component: PageNotFound,
  },
];

const routes = [...coreRoutes];
export default routes;
