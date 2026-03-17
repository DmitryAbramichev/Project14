import { useEffect } from 'react';
import { AppShell, Flex, Text, Pagination, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchVacancies } from '../../store/ vacanciesSlice'; // убрал пробелы
import { setPage } from '../../store/ filtersSlice';           // убрал пробелы
import { CitySelect } from '../CitySelect/CitySelect';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { SearchBar } from '../SearchBar/SearchBar';

export function Main() {
  const dispatch = useAppDispatch();

  const { items, loading, error, totalPages } = useAppSelector(state => state.vacancies);
  const filters = useAppSelector(state => state.filters);

  const page = filters.page;

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [filters, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage - 1));
  };

  return (
    <AppShell.Main>
      <Flex justify="center" direction="column">
        {/* Верхний блок: заголовок + поиск */}
        <Flex justify="center" direction="row" gap="xl" wrap="nowrap" p="xl">
          <Flex justify="space-between" direction="row" gap="md" style={{ flex: 1, maxWidth: 1130 }}>
            <div style={{ width: 366 }}>
              <Text fw={700} size="xl">Список вакансий</Text>
              <Text size="sm" c="dimmed">по профессии Frontend-разработчик</Text>
            </div>
            <SearchBar />
          </Flex>
        </Flex>

        {/* Нижний блок: фильтры и список */}
        <Flex justify="center" direction="row" gap="xl" wrap="wrap" p="xl">
          {/* Левая колонка с фильтрами */}
          <Flex direction="column" gap="md" style={{ width: 300 }}>
            <SkillsInput />
            <CitySelect />
          </Flex>

          {/* Правая колонка со списком вакансий */}
          <Flex direction="column" gap="md" style={{ flex: 1, maxWidth: 800 }}>
            {loading && <Loader size="lg" />}
            {error && <Alert color="red">{error}</Alert>}
            {!loading && !error && items.length === 0 && (
              <Text>Вакансии не найдены</Text>
            )}
            {items.map(vacancy => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
            {totalPages > 1 && (
              <Pagination
                total={totalPages}
                value={page + 1}
                onChange={handlePageChange}
                mt="md"
                style={{ alignSelf: 'center' }}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </AppShell.Main>
  );
}