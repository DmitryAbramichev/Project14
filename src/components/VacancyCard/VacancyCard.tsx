// src/components/VacancyCard/VacancyCard.tsx
import { Card, Text, Badge, Button, Flex, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { type Vacancy } from '../../store/types';

interface VacancyCardProps {
  vacancy: Vacancy;
  singleButtonText?: string; // если передан, показываем только одну кнопку с этим текстом
}

export function VacancyCard({ vacancy, singleButtonText }: VacancyCardProps) {
  const salary = vacancy.salary
    ? `${vacancy.salary.from ? `от ${vacancy.salary.from}` : ''} ${vacancy.salary.to ? `до ${vacancy.salary.to}` : ''} ${vacancy.salary.currency || ''}`
    : 'Зарплата не указана';

  const scheduleMap: Record<string, string> = {
    remote: 'Можно удалённо',
    office: 'Офис',
    hybrid: 'Гибрид',
  };
  const scheduleText = vacancy.schedule ? scheduleMap[vacancy.schedule.id] || vacancy.schedule.name : '';

  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Group justify="space-between" mb="xs">
        <Text c="#364FC7" fw={500} size="lg">{vacancy.name}</Text>
      </Group>

      <Flex gap="xs" wrap="wrap" mb="xs">
        <Text size="sm" mb="xs">{salary}</Text>
        <Text size="sm" c="dimmed" mb="xs">{vacancy.experience.name}</Text>
      </Flex>

      <Text size="sm" fw={500}>{vacancy.employer.name}</Text>
      {scheduleText && <Badge color="#4263EB" radius="xs" size="sm">{scheduleText}</Badge>}
      <Text size="sm">{vacancy.area.name}</Text>

      <Flex gap="sm">
        {singleButtonText ? (
          // Режим одной кнопки (на странице деталей) – ведёт на hh.ru
          <Button
            color="black"
            mt="md"
            component="a"
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {singleButtonText}
          </Button>
        ) : (
          // Режим двух кнопок (на главной)
          <>
            <Button
              color="black"
              mt="md"
              component={Link}
              to={`/vacancies/${vacancy.id}`}
            >
              Смотреть вакансию
            </Button>
            <Button
              component="a"
              href={vacancy.alternate_url}
              mt="md"
              target="_blank"
              rel="noopener noreferrer"
              color="gray"
              variant="light"
            >
              Откликнуться
            </Button>
          </>
        )}
      </Flex>
    </Card>
  );
}