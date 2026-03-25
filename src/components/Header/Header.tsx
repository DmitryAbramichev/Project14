import { Flex, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/image 2.png';
import ellipse from '../../assets/Ellipse 2.svg';
import vector from '../../assets/Vector.svg';

export function Header() {
  const getActiveStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: isActive ? '#000000ff' : '#c0c0c0ff',
    fontWeight: isActive ? 600 : 500,
    fontSize: '22px',
  });

  return (
    <Flex justify="space-between" align="center" p="xs">
      <Flex gap="xs" align="center">
        <img src={logo} alt="logo" />
        <Text fw={600} size="22px">.FrontEnd</Text>
      </Flex>
      <Flex mr={"45%"} gap="xs" align="center">
        <NavLink to="/vacancies/moscow" style={getActiveStyle}>
          <Text fw={500} size="22px">Вакансии FE</Text>
        </NavLink>
        <img src={ellipse} alt="ellipse" />
        <img src={vector} alt="vector" />
        <NavLink to="/about" style={getActiveStyle}>
          <Text fw={200} size="22px">Обо мне</Text>
        </NavLink>
      </Flex>
    </Flex>
  );
}