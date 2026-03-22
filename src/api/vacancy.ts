// src/api/vacancy.ts
// src/api/vacancy.ts
import type { Vacancy } from '../store/types'; // ваш тип Vacancy
 // ваш тип Vacancy

export async function fetchVacancyById(id: string): Promise<Vacancy> {
  const response = await fetch(`https://api.hh.ru/vacancies/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch vacancy');
  }
  const data = await response.json();
  return data;
}