// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Route,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import Home from './routes/index';
import { GlobalContextProvider } from './context/store';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Algod Web UI</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class='dark'>
        <Suspense>
          <ErrorBoundary>
            <GlobalContextProvider>
              <Routes>
                <Route path="/" element={<Home />}>
                </Route>
              </Routes>
            </GlobalContextProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
