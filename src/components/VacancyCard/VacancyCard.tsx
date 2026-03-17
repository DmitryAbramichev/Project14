import { Card, Text, Badge, Button, Flex, Group } from '@mantine/core';
import { type Vacancy } from '../../store/types';

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
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
      <Text size="sm"  mb="xs">{salary}</Text>
      <Text size="sm" c="dimmed" mb="xs">{vacancy.experience.name}</Text>
      </Flex>
      
      <Text size="sm" fw={500}>{vacancy.employer.name}</Text>
      {scheduleText && <Badge color="#4263EB" radius="xs" size="sm">{scheduleText}</Badge>}
      <Text size="sm">{vacancy.area.name}</Text>
      
      <Flex gap={"sm"}>
      <Button
        
        color="black"
        mt="md"
        component="a"
        href={vacancy.alternate_url}
        target="_blank"
        rel="noopener noreferrer"
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
        </Flex>
    </Card>
  );
}