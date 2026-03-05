
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 在 delay 毫秒后更新 debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 在下一次 effect 运行前或组件卸载时清除 timeout
    // 这确保了只有在用户停止输入后，值才会被更新
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 仅当 value 或 delay 改变时才重新调用

  return debouncedValue;
}
