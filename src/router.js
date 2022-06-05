import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminHome from "./pages/AdminHome";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import OrderCompleted from "./pages/OrderCompleted";
import RDV from "./pages/RDV";
import Shop from "./pages/Shop";
import { ReactComponent as CONSTRUCTION } from "./assets/construction.svg";
import Flash from "./pages/Flash";

export const routes = [
  {
    id: "home",
    label: "general.home",
    path: "/",
    element: HomePage,
    protected: false,
  },
  {
    id: "form",
    label: "general.form",
    path: "/form",
    element: RDV,
    protected: false,
  },
  {
    id: "shop",
    label: "general.shop",
    path: "/shop",
    element: Shop,
    protected: false,
  },
  {
    id: "flash",
    label: "general.flash",
    path: "/flash",
    element: Flash,
    protected: false,
  },
  {
    id: "orders",
    label: "general.orders",
    path: "/order/:id",
    element: OrderCompleted,
    protected: false,
  },
  {
    id: "login",
    label: "general.login",
    path: "/admin/login",
    element: Login,
    protected: false,
  },
  {
    id: "admin-home",
    label: "general.admin_home",
    path: "admin/home",
    element: AdminHome,
    protected: true,
  },
];

const AppRouter = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* <Header /> */}
      <Routes>
        {routes.map((r, idx) => {
          const Render = r.element;
          return r.protected ? (
            <Route
              key={idx}
              path={r.path}
              element={
                <ProtectedRoute>
                  <Render />
                </ProtectedRoute>
              }
            />
          ) : (
            <Route key={idx} path={r.path} element={<Render />} />
          );
        })}
        <Route
          path="*"
          element={
            <div className="construction-zone">
              <div className="construction-text">
                <h2>{t("construction.curious")}</h2>
                <p>{t("construction.come_back")}</p>
              </div>
              <CONSTRUCTION />
            </div>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default AppRouter;
