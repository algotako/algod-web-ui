import { createSignal, createEffect, onMount } from "solid-js";
import { createStore } from 'solid-js/store'
import { SolidApexCharts } from 'solid-apexcharts';
import terminalCalls from "~/lib/terminal-calls";

const VotingChart = () => {

  onMount(() => {
    const votes = terminalCalls.getHourlyVotes();
  })
  
  const [options] = createStore({
    chart: {
      id: 'solidchart-example',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Mar 25', 'Mar 26', 'Mar 27', 'Mar 28', 'Mar 29', 'Mar 30'],
    },
    theme: {
      mode: 'dark', 
      palette: 'palette4', 
    },
    fill: {
      colors: undefined,
      opacity: 0.9,
      type: 'solid',
      gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
      },
      image: {
          src: [],
          width: undefined,
          height: undefined
      },
      pattern: {
          style: 'verticalLines',
          width: 6,
          height: 6,
          strokeWidth: 2,
      },
    }
  });
  const [series] = createStore({
    list: [
      {
        name: 'Votes',
        data: [3, 2, 6, 5, 10, 7],
      },
    ]
  });

  return (
    <div class='bg-white dark:bg-gray-800 h-[20rem] p-4 rounded-sm flex flex-col flex-1 border border-gray-200 dark:border-gray-700 '> 
        <strong class='text-gray-400 font-medium'>
          Votes
        </strong>
        <div class='w-full mt-3 flex-1 text-xs'>
          <SolidApexCharts width="100%" height="260" type="bar" options={options} series={series.list} />
        </div>
    </div>
  )
}

export default VotingChart;
