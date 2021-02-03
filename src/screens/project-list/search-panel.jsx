import { useEffect, useState } from 'react';

export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          type="text"
          name=""
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={''}>负责人</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
