import { useState, type KeyboardEvent } from 'react';
import { Flex, Pill, TextInput, ActionIcon, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addSkill, removeSkill } from '../../store/filtersSlice'; // правильный путь

export function SkillsInput() {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(state => state.filters.skills);
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed && !skills.includes(trimmed)) {
      dispatch(addSkill(trimmed));
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <Text>Ключевые навыки</Text>
      <Flex gap="xs" align="center">
        <TextInput
          placeholder="Навык"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
        <ActionIcon onClick={handleAdd} color="blue" variant="light">
          <IconPlus size={16} />
        </ActionIcon>
      </Flex>
      <Flex gap="xs" wrap="wrap" mb="sm">
        {skills.map((skill: string) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => dispatch(removeSkill(skill))}
          >
            {skill}
          </Pill>
        ))}
      </Flex>
    </div>
  );
}