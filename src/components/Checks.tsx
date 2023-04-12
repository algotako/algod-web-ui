import { onMount } from 'solid-js';
import { useGlobalContext } from '../context/store';
import terminalCalls from '../lib/terminal-calls';

export default function Checks() {
  const store: any = useGlobalContext();

  onMount(async () => {
    const response = await terminalCalls.initChecks();
    if (response.allPassed) {
      // All checks passed, now save algod.net and algod.token
      const net = await terminalCalls.getNet();
      const token = await terminalCalls.getToken();
      if (net.error || token.error) {
        // Something went wrong
      } else {
        store.setState('isInitialized', true);
        store.setState('url', `http://${net}`);
        store.setState('token', token);
      }
    } else {
      // Not all checks passed let the user know
      
    }
  })
  return (
    <div class="w-full h-full flex justify-center">
      Checking for Paths and Algod service...
    </div>
  );
}