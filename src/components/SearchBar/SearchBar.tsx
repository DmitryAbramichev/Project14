import { TextInput, Button, Flex } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setSearch } from '../../store/filtersSlice';
import { useState } from 'react';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.filters.search);
  const [inputValue, setInputValue] = useState(search);

  const handleSearch = () => {
    dispatch(setSearch(inputValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex gap="md" align="center" style={{ width: '508px' }}>
      <TextInput
        placeholder="Поиск по названию вакансии или компании..."
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
      />
      <Button onClick={handleSearch}>Найти</Button>
    </Flex>
  );
};