import { createStore } from 'solid-js/store'
import { SolidApexCharts } from 'solid-apexcharts';
import radialBarBuilder from '../lib/chartBuilder';

const RadialBar = () => {
  const [series] = createStore({
    series: [57]
  });

  const [options] = createStore(radialBarBuilder({}));
  return (
    <div class='w-[20rem] h-[22rem] bg-white dark:bg-gray-800 p-4 rounded-sm flex flex-col border border-gray-200 dark:border-gray-700 '>
      <div class='flex flex-1 justify-evenly text-xs'>
        <div>
          <span class='flex justify-center dark:text-gray-400 w-full'>Mem</span>
          <SolidApexCharts width="125" height="125" type="radialBar" options={options.options} series={series.series} />
        </div>
        <div>
          <span class='flex justify-center dark:text-gray-400'>Space</span>
          <SolidApexCharts width="125" height="125" type="radialBar" options={options.options} series={series.series} />
        </div>
      </div>
      <div class='flex justify-evenly text-xs'>
        <div>
          <span class='flex justify-center dark:text-gray-400 w-full'>Mem</span>
          <SolidApexCharts width="125" height="125" type="radialBar" options={options.options} series={series.series} />
        </div>
        <div>
          <span class='flex justify-center dark:text-gray-400'>Space</span>
          <SolidApexCharts width="125" height="125" type="radialBar" options={options.options} series={series.series} />
        </div>
      </div>
    </div>
  )
};

export default RadialBar;