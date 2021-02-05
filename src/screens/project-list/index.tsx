import { useEffect, useState } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { cleanObject, useDebounce, useMount } from 'utilities';
import { useHttp } from 'utilities/http';

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
  }, [debouncedValue]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
