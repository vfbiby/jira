import { useEffect, useState } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { cleanObject, useDebounce, useMount } from 'utilities';
import { useHttp } from 'utilities/http';
import styled from '@emotion/styled';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 500);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedValue) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
