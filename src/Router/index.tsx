import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../view/layouts/AdminLayout';
import { AppLayout } from '../view/layouts/AppLayout';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { ActiveAccount } from '../view/pages/ActiveAccount';
import { Activities } from '../view/pages/Activities';
import { Client } from '../view/pages/Client';
import { Clients } from '../view/pages/Clients';
import { Home } from '../view/pages/Home';
import { Login } from '../view/pages/Login';
import { Project } from '../view/pages/Project';
import { Projects } from '../view/pages/Projects';
import { Settings } from '../view/pages/Settings';
import { Users } from '../view/pages/Users';

import { AuthGuard } from './AuthGuard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
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
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate isAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<h1>Admin</h1>} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/activeAccount" element={<ActiveAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
