import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  page: number;
  search: string;
  city: 'all' | '1' | '2';
  skills: string[];
}

const initialState: FiltersState = {
  page: 0,
  search: '',
  city: 'all',
  skills: ['TypeScript', 'React', 'Redux'],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 0;
    },
    setCity: (state, action: PayloadAction<'all' | '1' | '2'>) => {
      state.city = action.payload;
      state.page = 0;
    },
    // Добавляем навык
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
        state.page = 0;
      }
    },
    // Удаляем навык
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(s => s !== action.payload);
      state.page = 0;
    },
    // Устанавливаем массив навыков целиком (для синхронизации с URL)
    setSkillsArray: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
      state.page = 0;
    },
  },
});

export const { setPage, setSearch, setCity, addSkill, removeSkill, setSkillsArray } = filtersSlice.actions;
export default filtersSlice.reducer;