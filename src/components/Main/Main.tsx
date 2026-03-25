import { useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AppShell, Flex, Text, Pagination, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchVacancies } from '../../store/vacanciesSlice';
import { setPage, setSearch, setSkillsArray, setCity } from '../../store/filtersSlice';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import { CityTabs } from '../CityTabs/CityTabs';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { SearchBar } from '../SearchBar/SearchBar';

export function Main() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isInitialized = useRef(false);
  const isUpdatingFromUrl = useRef(false);
  const prevFilters = useRef({ search: '', skills: [] as string[], page: 0 });

  const { items, loading, error, totalPages } = useAppSelector(state => state.vacancies);
  const filters = useAppSelector(state => state.filters);
  const page = filters.page;

  // 1. Синхронизация города из пути в Redux (без лишних зависимостей)
  useEffect(() => {
    let mappedCity: 'all' | '1' | '2' = 'all';
    if (location.pathname === '/vacancies/moscow') mappedCity = '1';
    else if (location.pathname === '/vacancies/petersburg') mappedCity = '2';
    if (mappedCity !== filters.city) {
      dispatch(setCity(mappedCity));
    }
  }, [location.pathname, dispatch]); // убрали filters.city, чтобы не было цикла

  // 2. Чтение URL → Redux (только при изменении URL)
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;
    isUpdatingFromUrl.current = true;

    const searchParam = searchParams.get('search');
    if (searchParam !== null && searchParam !== filters.search) {
      dispatch(setSearch(searchParam));
    }

    const skillsParam = searchParams.get('skills');
    if (skillsParam !== null) {
      const skills = skillsParam.split(',').filter(Boolean);
      if (JSON.stringify(skills) !== JSON.stringify(filters.skills)) {
        dispatch(setSkillsArray(skills));
      }
    }

    const pageParam = searchParams.get('page');
    if (pageParam !== null) {
      const pageNum = Number(pageParam) - 1;
      if (pageNum !== filters.page) dispatch(setPage(pageNum));
    }

    isUpdatingFromUrl.current = false;
    if (!isInitialized.current) {
      isInitialized.current = true;
    }
  }, [searchParams]); // зависимость только от URL

  // 3. Запись Redux → URL (только когда фильтры изменились и это не из-за чтения)
  useEffect(() => {
    if (!isInitialized.current) return;
    if (isUpdatingFromUrl.current) return;

    const prev = prevFilters.current;
    if (prev.search === filters.search && 
        JSON.stringify(prev.skills) === JSON.stringify(filters.skills) &&
        prev.page === filters.page) {
      return; // ничего не изменилось
    }

    // Обновляем ref
    prevFilters.current = {
      search: filters.search,
      skills: filters.skills.slice(),
      page: filters.page,
    };

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.skills.length) params.set('skills', filters.skills.join(','));
    if (filters.page > 0) params.set('page', String(filters.page + 1));

    // Сравниваем с текущим URL, чтобы избежать лишних обновлений
    const currentSearch = searchParams.toString();
    const newSearch = params.toString();
    if (currentSearch !== newSearch) {
      setSearchParams(params, { replace: true });
    }
  }, [filters.search, filters.skills, filters.page, setSearchParams, searchParams]);

  // 4. Загрузка вакансий при изменении фильтров
  useEffect(() => {
    dispatch(fetchVacancies());
  }, [filters, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage - 1));
  };

  return (
    <AppShell.Main>
      <Flex justify="center" direction="column">
        <Flex justify="center" direction="row" gap="xl" wrap="nowrap" p="xl">
          <Flex justify="space-between" direction="row" gap="md" style={{ flex: 1, maxWidth: 1130 }}>
            <div style={{ width: 366 }}>
              <Text fw={700} size="xl">Список вакансий</Text>
              <Text size="sm" c="dimmed">по профессии Frontend-разработчик</Text>
            </div>
            <SearchBar />
          </Flex>
        </Flex>

        <Flex justify="center" direction="row" gap="xl" wrap="wrap" p="xl">
          <Flex direction="column" gap="md" style={{ width: 300 }}>
            
            <SkillsInput />
          </Flex>

          <Flex direction="column" gap="md" style={{ flex: 1, maxWidth: 800 }}>
            <CityTabs />
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