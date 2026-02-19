import {useEffect, useRef} from 'react';

// Adapted from Dan Abramov's post regarding setInterval & React hooks:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useTimeout(callback: () => any, delay: number) {
  const savedCallback = useRef<() => any>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setTimeout(tick, delay);
    return () => clearTimeout(id);
  }, [delay]);
}
