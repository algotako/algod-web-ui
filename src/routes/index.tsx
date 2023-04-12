import { Routes, Route } from "solid-start";
import { Show, Switch, Match, lazy } from 'solid-js';
import { useGlobalContext } from '../context/store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faDashcube } from '@fortawesome/free-brands-svg-icons';

//import Checks from '~/components/Checks';
//import Layout from "~/components/shared/Layout";
const Checks = lazy(() => import('~/components/Checks'));
const Layout = lazy(() => import('~/components/shared/Layout'));
const Dashboard = lazy(() => import('./dashboard/index'));

// Add fontawesome to library
library.add(fas, far, faTwitter, faDashcube);


export default function Home() {
  const store: any = useGlobalContext();

  return (
    <Switch>
      <Match when={!store.state.isInitialized}>
        <Checks />
      </Match>
      <Match when={store.state.isInitialized}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Match>
    </Switch>
  );
}
