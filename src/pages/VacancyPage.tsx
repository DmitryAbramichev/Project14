import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Loader, Text, Title, Paper} from '@mantine/core';
import { VacancyCard } from '../components/VacancyCard/VacancyCard';
import { fetchVacancyById } from '../api/vacancy';

export function VacancyPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: vacancy,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => fetchVacancyById(id!),
    enabled: !!id,
    retry: false,
  });

  if (isLoading) {
    return (
      <Container size="md" py="xl" style={{ textAlign: 'center' }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (error || !vacancy) {
    return (
      <Container size="md" py="xl">
        <Text c="red" size="lg">
          Не удалось загрузить вакансию. Проверьте ID или попробуйте позже.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <VacancyCard vacancy={vacancy} singleButtonText="Откликнуться на hh.ru"  />

      {/* Полное описание вакансии */}
      {vacancy.description && (
        <Paper withBorder p="lg" mt="xl" radius="md">
          <Title order={3} mb="xs">
            Компания
          </Title>
          <div
            dangerouslySetInnerHTML={{ __html: vacancy.description }}
            style={{ lineHeight: 1.5 }}
          />
        </Paper>
      )}

      
    </Container>
  );
}