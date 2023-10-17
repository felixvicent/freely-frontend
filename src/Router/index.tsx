import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '../view/layouts/AppLayout';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { Client } from '../view/pages/Client';
import { Clients } from '../view/pages/Clients';
import { Home } from '../view/pages/Home';
import { Login } from '../view/pages/Login';
import { Project } from '../view/pages/Project';
import { Projects } from '../view/pages/Projects';
import { Register } from '../view/pages/Register';

import { AuthGuard } from './AuthGuard';

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
