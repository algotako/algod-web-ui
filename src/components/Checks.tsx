import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useGlobalContext } from '../context/store';
import terminalCalls from '../lib/terminal-calls';

export default function Checks() {
  const store: any = useGlobalContext();
  const [checks, setChecks] = createStore({
    node: '',
    data: '',
    algod: '',
    net: '',
    token: '',
  })

  const setCheckState = (resp: any) => {
    setChecks('node', resp.nodePath ? 'passed': 'failed');
    setChecks('data', resp.dataPath ? 'passed': 'failed');
    setChecks('algod', resp.algodRunning ? 'running': 'not running');
  }

  onMount(async () => {
    const response = await terminalCalls.initChecks();
    if (response.allPassed) {
      setCheckState(response);
      // All checks passed, now save algod.net and algod.token
      const net = await terminalCalls.getNet();
      const token = await terminalCalls.getToken();
      if (net.error || token.error) {
        // Something went wrong

      } else {
        store.setState('isInitialized', true);
        store.setState('url', `http://${net.msg}`);
        store.setState('token', token.msg);
      }
    } else {
      // Not all checks passed let the user know
      setCheckState(response);
    }
  })
  return (
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div class='bg-white dark:bg-gray-800 dark:text-gray-200 m-auto w-[30rem] h-[40rem] rounded-md border border-gray-200 dark:border-gray-600'>
        <div class='p-10'>
          Checking for Paths and Algod service...
          <div class='pt-5'>
            <div class=''>
              $ALGORAND_NODE...<span class=''>{checks.node}</span>
            </div>
            <div>
              $ALGORAND_DATA...<span class=''>{checks.data}</span>
            </div>
            <div>
              Algod is...<span class=''>{checks.algod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}