import { FontAwesomeIcon } from "solid-fontawesome";
import { onMount, For } from "solid-js";
import { createStore } from "solid-js/store";

import terminalCalls from "~/lib/terminal-calls";

const AlgodLogs = () => {
  const [logState, setLogState] = createStore({logs: []});

  const thClasses = 'border border-slate-700 dark:border-slate-300'
  const tdClasses = 'text-center border border-slate-400 overflow-hidden p-2'
  
  const getLogs = async () => {
    const logs = await terminalCalls.getAlgodLogs();
    setLogState('logs', logs);
  }

  const undefinedFilter = (text: string) => {
    return text !== undefined ? true : '';
  }

  onMount(async () => {
    getLogs();
  });
  
  return (
    <div class='bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 pt-3 pb-3 rounded-sm flex-1 w-full'>
      <div class='flex flex-row justify-between'>
        <strong class='font-medium'>
          Algod Logs
        </strong>
        <button onclick={() => getLogs()} class="bg-gray-700 hover:bg-gray-600 text-white font-bold px-2 rounded-full">
          <FontAwesomeIcon icon='fa-solid fa-rotate' />
        </button>
      </div>
      <table class="table-fixed mt-4 w-full border-collapse text-gray-500 dark:text-gray-200">
        <thead>
          <tr>
            <th class={thClasses}>Time</th>
            <th class={thClasses}>Round</th>
            <th class={thClasses}>Type</th>
            <th class={thClasses}>Weight</th>
            <th class={thClasses}>Sender</th>
          </tr>
        </thead>
        <tbody>
          <For each={logState.logs} fallback={<div>Loading...</div>}>
            {(log: any) => 
              <tr>
                <td class={`${tdClasses}`}>{log?.time.slice(log.time.indexOf('T') + 1, log.time.lastIndexOf('-') - 3)}</td>
                <td class={`${tdClasses}`}><span class='text-cyan-600'>{log.Round}</span>.<span class='text-red-600'>{log.ObjectPeriod}</span>.<span class='text-amber-600'>{log.ObjectStep}</span></td>
                <td class={`${tdClasses}`}>{`${undefinedFilter(log.Type) && log.Type}`}</td>
                <td class={`${tdClasses}`}>{`${undefinedFilter(log.Weight) && log.Weight}/${undefinedFilter(log.WeightTotal) && log.WeightTotal}`}</td>
                <td class={`${tdClasses} text-green-300`}>{`${undefinedFilter(log.Sender) && log.Sender?.slice(0, 5)}...${undefinedFilter(log.Sender) && log.Sender?.slice(-5)}`}</td>
              </tr>
            }
          </For>
        </tbody>
      </table>
    </div>
  )
};

export default AlgodLogs;