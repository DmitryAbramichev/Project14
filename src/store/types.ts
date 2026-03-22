export interface Vacancy {
  id: string;
  name: string;
  alternate_url: string;
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  experience: {
    id: string;
    name: string;
  };
  schedule?: {
    id: string;
    name: string;
  };
  description?: string; 
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
  url: string;
}

export interface VacanciesResponse {
  items: Vacancy[];
  pages: number;
  page: number;
}

export interface FiltersState {
  search: string;
  city: string;      // 'all' | '1' | '2'
  skills: string[];
  page: number;
}

export interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export interface RootState {
  filters: FiltersState;
  vacancies: VacanciesState;
}