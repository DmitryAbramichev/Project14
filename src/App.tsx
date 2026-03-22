import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { VacancyPage } from './pages/VacancyPage';

function App() {
  return (
    <BrowserRouter>
      <AppShell header={{ height: 70 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/vacancies" element={<Main />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;