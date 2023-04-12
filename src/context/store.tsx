import { createStore } from "solid-js/store";
import { createContext, useContext } from 'solid-js';

// Global context so that a store can be accessed from anywhere
// on the application

type Store = {
  isInitialized: boolean
  url: string,
  token: string,
}

// Singleton store object. ** We can make some member private using the module pattern later
const store: Store = {
  isInitialized: false,
  url: '',
  token: '',
}

const GlobalContext = createContext();

export function GlobalContextProvider(props: any) {
  const [state, setState] = createStore(store);

  return (
    <GlobalContext.Provider value={{state, setState}}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)!;