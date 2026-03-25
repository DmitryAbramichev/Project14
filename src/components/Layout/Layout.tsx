import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { Header } from '../Header/Header';

export function Layout() {
  return (
    <AppShell header={{ height: 70 }}>
      <Header />
      <Outlet />
    </AppShell>
  );
}