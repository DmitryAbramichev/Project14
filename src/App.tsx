import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Main } from './components/Main/Main';
import { VacancyPage } from './pages/VacancyPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="/vacancies/moscow" element={<Main />} />
          <Route path="/vacancies/petersburg" element={<Main />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;