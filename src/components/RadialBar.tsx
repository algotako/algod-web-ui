import { createSignal, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store'
import { SolidApexCharts, createApexCharts } from 'solid-apexcharts';
import { useGlobalContext } from '../context/store';

import barTypes from '../utils/chartBuilder';
import terminalCalls from '~/lib/terminal-calls';
import Spinner from './Spinner';

// Bar gradients
const defaultColor = '#ABE5A1';
const blackRose = ['#F4C4F3', '#FC67FG'];
const azurePop = ['#EF32D9', '#89FFFD'];
const cosmicUniverse = ['#FF00CC', '#333399'];

// Track background colors
const track = '#fff';
const darkTrack = '#555';

// Option starter template
const memOptionsTemp = {
  series: [0],
  options: {
    chart: {
      id: 'mem-used'
    }
  }
}

const diskOptionsTemp = {
  series: [0],
  options: {
    chart: {
      id: 'disk-used'
    }
  }
}

const RadialBar = () => {
  const store: any = useGlobalContext();
  const ApexCharts = createApexCharts();
  const [isLoading, setIsLoading] = createSignal(true);;
  const [memOptions, setMemOptions] = createStore(JSON.parse(JSON.stringify(memOptionsTemp)));
  const [diskOptions, setDiskOptions] = createStore(JSON.parse(JSON.stringify(diskOptionsTemp)));

  onMount(async () => {
    const memPercentage = await terminalCalls.getMemUsed();
    const diskPercentage = await terminalCalls.getDiskUsed();
    const memTemplate = { series: [memPercentage], trackBackground: darkTrack, };
    const diskTemplate = { series: [diskPercentage], trackBackground: darkTrack, };
    const memOp = barTypes.radialBarBuilder(memTemplate, store.state.theme.radialBar);
    const diskOp = barTypes.radialBarBuilder(diskTemplate, store.state.theme.radialBar);
    setIsLoading(false);
    ApexCharts.exec('mem-used', 'updateOptions', memOp.options);
    ApexCharts.exec('mem-used', 'updateSeries', memOp.series);
    ApexCharts.exec('disk-used', 'updateOptions', diskOp.options);
    ApexCharts.exec('disk-used', 'updateSeries', diskOp.series);
  })

  return (
    <div class='w-[22rem] h-[20rem] bg-white dark:bg-gray-800 p-4 rounded-sm flex flex-col border border-gray-200 dark:border-gray-700 '>
      <div class='flex h-full justify-center text-xs'>
        <Show when={!isLoading()} fallback={<div class='m-auto'><Spinner /></div>}>
          <div class='mt-10'>
            <span class='flex justify-center dark:text-gray-400 w-full'>Mem Used:</span>
            <SolidApexCharts width="180" height="180" type="radialBar" options={memOptions.options} series={memOptions.series} />
          </div>
          <div class='mt-10'>
            <span class='flex justify-center dark:text-gray-400'>Disk Used:</span>
            <SolidApexCharts width="180" height="180" type="radialBar" options={diskOptions.options} series={diskOptions.series} />
          </div>
        </Show>
      </div>
    </div>
  )
};

export default RadialBar;