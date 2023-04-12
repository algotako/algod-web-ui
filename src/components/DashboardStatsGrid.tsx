import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useGlobalContext } from '../context/store';
import { FontAwesomeIcon } from "solid-fontawesome";
import terminalCalls from '../lib/terminal-calls';

const DashboardStatsGrid = () => {
  const store: any = useGlobalContext();
  const [state, setState] = createStore({
    lastRound: '',
    proposals: '',
    votes: '',
    frozen: '',
  });

  onMount(async () => {
    const status = await terminalCalls.getStatus();
    const proposals = await terminalCalls.getProposals();
    const votes = await terminalCalls.getVotes();
    const frozen = await terminalCalls.getFrozen();
    if (status.error || proposals.error || votes.error || frozen.error) {
      // Something went wrong
    } else {
      setState('lastRound', status.msg['Last committed block']);
      setState('proposals', proposals.msg);
      setState('votes', votes.msg);
      setState('frozen', frozen.msg);
    }
  })

  const BoxWrapper = ({ children}) => {
    const gridClasses = 'bg-white dark:bg-gray-800 rounded-sm p-4 flex-1 border border-gray-200 dark:border-gray-700 flex items-center';
    return (
      <div class={gridClasses}>{children}</div>
    );
  };
  
  return (
    <div class='flex gap-4 text-gray-800 dark:text-gray-200 w-full'>
      <BoxWrapper>
        <div class='rounded-full h-10 w-10 flex items-center justify-center bg-purple-600'>
          <span class='relative top-0.5 text-lg text-gray-100'>
            <FontAwesomeIcon icon='fa-solid fa-timeline'/>
          </span>
        </div>
        <div class='pl-4'>
          <span class='text-sm text-gray-400 dark:text-gray-300 font-light'>
            Last Round
          </span>
          <div class='flex items-center justify-center'>
            <strong class='text-xl text-gray-400 dark:text-gray-200 font-semi-bold'>
              {state.lastRound}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div class='rounded-full h-10 w-10 flex items-center justify-center bg-green-600'>
          <span class='relative top-0.5 text-lg text-gray-100'>
            <FontAwesomeIcon icon='fa-solid fa-diagram-project'/>
          </span>
        </div>
        <div class='pl-4'>
          <span class='text-sm text-gray-400 dark:text-gray-300 font-light'>Proposals</span>
          <div class='flex items-center justify-center'>
            <strong class='text-xl text-gray-400 dark:text-gray-200 font-semi-bold'>
              {state.proposals}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div class='rounded-full h-10 w-10 flex items-center justify-center bg-orange-600'>
          <span class='relative text-lg text-gray-100'>
            <FontAwesomeIcon icon='fa-solid fa-check-to-slot'/>
          </span>
        </div>
        <div class='pl-4'>
          <span class='text-sm text-gray-400 dark:text-gray-300 font-light'>Votes</span>
          <div class='flex items-center justify-center'>
            <strong class='text-xl text-gray-400 dark:text-gray-200 font-semi-bold'>
              {state.votes}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div class='rounded-full h-10 w-10 flex items-center justify-center bg-sky-500'>
          <span class='relative text-lg text-gray-200'>
            <FontAwesomeIcon icon='fa-solid fa-snowflake'/>
          </span>
        </div>
        <div class='pl-4'>
          <span class='text-sm text-gray-400 dark:text-gray-300 font-light'>Frozen</span>
          <div class='flex items-center justify-center'>
            <strong class='text-xl text-gray-400 dark:text-gray-200 font-semi-bold'>
              {state.frozen}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}
  
export default DashboardStatsGrid;