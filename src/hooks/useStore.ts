import { useContext, useMemo } from 'react';
import { StoreContext } from '@context';
import type { Store } from '@types';

/**
 * Hook to access the store
 * @returns {Store} The store
 * @throws {Error} If the hook is not used within a `ContextProvider` component
 * @example
 * const store = useStore();
 * memoized for performance
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
const useStore = (): Store => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error(
      'useStore: This hook must be used in a component wrapped within a `ContextProvider` component'
    );
  }
  return useMemo(() => context, [context]);
};

export { useStore };
