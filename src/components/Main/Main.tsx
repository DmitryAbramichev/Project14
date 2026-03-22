import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppShell, Flex, Text, Pagination, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchVacancies } from '../../store/ vacanciesSlice';
import { setPage, setSearch, setCity, setSkillsArray } from '../../store/ filtersSlice';
import { CitySelect } from '../CitySelect/CitySelect';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { SearchBar } from '../SearchBar/SearchBar';

export function Main() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialized = useRef(false);
  const isUpdatingFromUrl = useRef(false);

  const { items, loading, error, totalPages } = useAppSelector(state => state.vacancies);
  const filters = useAppSelector(state => state.filters);
  const page = filters.page;

  // 1. Чтение URL → обновление Redux (только если параметр присутствует)
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;
    isUpdatingFromUrl.current = true;

    // поиск
    const searchParam = searchParams.get('search');
    if (searchParam !== null && searchParam !== filters.search) {
      dispatch(setSearch(searchParam));
    }

    // город
    const cityParam = searchParams.get('city');
    if (cityParam !== null) {
      let city: 'all' | '1' | '2' = 'all';
      if (cityParam === '1' || cityParam === '2') city = cityParam;
      if (city !== filters.city) dispatch(setCity(city));
    }

    // навыки
    const skillsParam = searchParams.get('skills');
    if (skillsParam !== null) {
      const skills = skillsParam.split(',').filter(Boolean);
      if (JSON.stringify(skills) !== JSON.stringify(filters.skills)) {
        dispatch(setSkillsArray(skills));
      }
    }

    // страница
    const pageParam = searchParams.get('page');
    if (pageParam !== null) {
      const pageNum = Number(pageParam) - 1;
      if (pageNum !== filters.page) dispatch(setPage(pageNum));
    }

    isUpdatingFromUrl.current = false;
    isInitialized.current = true;
  }, [searchParams]);

  // 2. Запись Redux → URL
  useEffect(() => {
    if (!isInitialized.current) return;
    if (isUpdatingFromUrl.current) return;
    isUpdatingFromUrl.current = true;

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.city !== 'all') params.set('city', filters.city);
    if (filters.skills.length) params.set('skills', filters.skills.join(','));
    if (filters.page > 0) params.set('page', String(filters.page + 1));

    setSearchParams(params, { replace: true });
    isUpdatingFromUrl.current = false;
  }, [filters.search, filters.city, filters.skills, filters.page, setSearchParams]);

  // Загрузка вакансий при изменении фильтров
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