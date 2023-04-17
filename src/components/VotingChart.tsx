import { createSignal, createEffect, Show } from "solid-js";
import { createStore } from 'solid-js/store'
import { SolidApexCharts, createApexCharts } from 'solid-apexcharts';
import terminalCalls from "~/lib/terminal-calls";
import barTypes from "~/lib/chartBuilder";
import Spinner from "./Spinner";

const VotingChart = () => {
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
      }
    }
  });

  createEffect(async () => {
    const votes = await terminalCalls.getHourlyVotes();
    const barOptions = barTypes.barBuilder(votes);

    // For some reason we need to set the isLoading signal before we uupdate the chart
    setIsLoading(false);
    ApexCharts.exec(chartId, 'updateOptions', barOptions);
    ApexCharts.exec(chartId, 'updateSeries', [{
      name: 'Votes',
      data: [10, 24, 15, 23, 6, 1]
    }]);
  });

  return (
    <div class='bg-white dark:bg-gray-800 w-full h-[20rem] p-4 rounded-sm flex border border-gray-200 dark:border-gray-700 '> 
      <Show when={!isLoading()} fallback={<div class='m-auto'><Spinner /></div>}>
        <strong class='text-gray-400 font-medium invisible'>
          |
        </strong>
        <div class='w-full m-auto flex-1 text-xs'>
          <SolidApexCharts width="100%" height={260} type="bar" options={options.options} series={options.series} />
        </div>
     </Show>
    </div>
  );
}

export default VotingChart;
