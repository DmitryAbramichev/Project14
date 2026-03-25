import { Tabs } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';

export function CityTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMoscow = location.pathname === '/vacancies/moscow';
  const isPetersburg = location.pathname === '/vacancies/petersburg';
  const activeTab = isMoscow ? 'moscow' : isPetersburg ? 'petersburg' : 'moscow';

  const handleTabChange = (value: string | null) => {
    if (value === 'moscow' || value === 'petersburg') {
      navigate(`/vacancies/${value}${location.search}`);
    }
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="moscow">Москва</Tabs.Tab>
        <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}