import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { VacancyPage } from './pages/VacancyPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AppShell header={{ height: 70 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="/vacancies/moscow" element={<Main />} />
          <Route path="/vacancies/petersburg" element={<Main />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;