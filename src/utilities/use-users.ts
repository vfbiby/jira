import { useEffect } from 'react';
import { User } from 'screens/project-list/search-panel';
import { cleanObject } from 'utilities';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
