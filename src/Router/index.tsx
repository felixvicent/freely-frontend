import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { Home } from "../view/pages/Home";
import { AuthGuard } from "./AuthGuard";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { AppLayout } from "../view/layouts/AppLayout";
import { Clients } from "../view/pages/Clients";
import { Projects } from "../view/pages/Projects";
import { Client } from "../view/pages/Client";
import { Project } from "../view/pages/Project";
import { Activities } from "../view/pages/Activities";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId" element={<Client />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<Project />} />
            <Route path="/activities" element={<Activities />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
