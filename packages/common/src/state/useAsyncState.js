// @ts-check
import { useState, useEffect } from "react";
import { useIsMounted } from "../utils/hooks";

/**
 * @typedef {{
 * immediate?: boolean
 * onError?: (e: unknown) => void
 * }} useAsyncStateOption
 */
/**
 * @copyright vueuse
 * @param {Promise<any> | ((...args: any[]) => Promise<any>)} promise
 * @param {any} initialState
 * @param {useAsyncStateOption} options
 */
export function useAsyncState(promise, initialState, options) {
  const { immediate = true, onError = () => {} } = options ?? {};
  const isMounted = useIsMounted();

  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(immediate);

  const execute = async (...args) => {
    setIsReady(false);
    setIsLoading(true);

    const p = typeof promise === "function" ? promise(...args) : promise;

    try {
      const data = await p;

      setState(data);
      setIsReady(true);
    } catch (e) {
      setError(e);
      onError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      if (isMounted) {
        execute();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    error,
    isReady,
    isLoading,
    execute,
  };
}
