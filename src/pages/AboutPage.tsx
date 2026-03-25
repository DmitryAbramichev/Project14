import { Container, Title, Text, Paper } from '@mantine/core';

export function AboutPage() {
  return (
    <Container size="md" py="xl">
      <Paper withBorder p="lg" radius="md">
        <Title order={1} mb="md">Обо мне</Title>
        <Text size="lg" mb="sm">
          Привет! Меня зовут Дмитрий. Я frontend-разработчик.
        </Text>
        <Text size="md" mb="sm">
          Я изучаю React, TypeScript, Redux Toolkit, Mantine и другие современные технологии.
        </Text>
        <Text size="md">
          Этот проект — результат практики работы с API HeadHunter, роутингом и синхронизацией состояния с URL.
        </Text>
      </Paper>
    </Container>
  );
}