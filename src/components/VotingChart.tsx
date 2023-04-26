import { createSignal, createEffect, Show } from "solid-js";
import { createStore } from 'solid-js/store'
import { SolidApexCharts, createApexCharts } from 'solid-apexcharts';
import { useGlobalContext } from '../context/store';

import terminalCalls from "~/lib/terminal-calls";
import barTypes from "~/lib/chartBuilder";
import Spinner from "./Spinner";

const VotingChart = () => {
  const store: any = useGlobalContext();
  const chartId = 'vote-chart-id';
  const [isLoading, setIsLoading] = createSignal(true);
  const ApexCharts = createApexCharts();
  const [options] = createStore({
    series: [{
      name: 'Votes',
      data: [0]
    }],
    options: {
      chart: {
        id: chartId,
      },
    }
  });

  createEffect(async () => {
    const votes = await terminalCalls.getHourlyVotes();
    const theme = store.state.theme.barChart.themeMode;
    const barOptions = barTypes.barBuilder(votes, theme);
    // For some reason we need to set the isLoading signal before we uupdate the chart
    setIsLoading(false);
    ApexCharts.exec(chartId, 'updateOptions', barOptions);
    ApexCharts.exec(chartId, 'updateSeries', [{
      name: 'Votes',
      data: votes.votes
    }]);
  });

  return (
    <div class='bg-white dark:bg-gray-800 w-full h-[20rem] p-4 rounded-sm flex flex-1 flex-col border border-gray-200 dark:border-gray-700 '> 
      <Show when={!isLoading()} fallback={<div class='m-auto'><Spinner /></div>}>
        <div class='w-full m-auto flex-1'>
          <SolidApexCharts width="100%" height={280} type="bar" options={options.options} series={options.series} />
        </div>
     </Show>
    </div>
  );
}

export default VotingChart;
