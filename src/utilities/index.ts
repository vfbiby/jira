import { useEffect, useRef, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key: string) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  const clear = () => {
    setValue([]);
  };

  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };

  const add = (item: T) => {
    setValue([...value, item]);
  };

  return { clear, removeIndex, add, value };
};

export const useDocumentTitle = (title: string, keepOnUnMount: false) => {
  let oldTitle = useRef(document.title).current;
  //console.log('渲染时的oldTitle', oldTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      //console.log('卸载时oldTitle', oldTitle);
      if (!keepOnUnMount) {
        document.title = oldTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};

/**
 * 返回组件的挂载状态，如果还没有挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
