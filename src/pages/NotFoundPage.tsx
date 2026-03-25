import { Flex, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: 'calc(100vh - 70px)', // вычитаем высоту хедера
        paddingTop: 72,
      }}
    >
      <Flex 
      direction="column"
      wrap="wrap"
       style={{ width: 707, height: 556 }}>
        <Text ta="center" fw={700} size="xl" mb="lg">
          Упс! Такой страницы не существует
        </Text>
       
        <Text ta="center" mb="xl">
          Давайте перейдем к началу.
        </Text>
          <Flex justify="center" style={{ marginBottom: 30 }}>
          <Button style={{backgroundColor: 'blue'}} component={Link} to="/" size="md" color="black">
            На главную
          </Button>
        </Flex>
       
        <img src="/src/assets/sad-cat 1.png" alt="" />
      </Flex>
    </Flex>
  );
}