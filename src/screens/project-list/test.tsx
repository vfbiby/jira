import { useEffect, useState } from 'react';

export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  return (
    <div>
      <button onClick={add}>add</button>
      <span> {num}</span>
    </div>
  );
};
