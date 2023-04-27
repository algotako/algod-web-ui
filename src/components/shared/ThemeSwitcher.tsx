import { createSignal, Show } from "solid-js";
import { useGlobalContext } from '../../context/store';
import { createApexCharts } from 'solid-apexcharts';
import barTypes from "~/utils/chartBuilder";

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = createSignal(true);
  const store: any = useGlobalContext();
  const barChartId = 'vote-chart-id';
  const memChartid = 'mem-used';
  const diskChartId= 'disk-used';
  const ApexCharts = createApexCharts();
  
  const switchTheme = () => {
    setIsDark(!isDark());
    const theme = isDark() ? 'dark' : 'light';  
    
    // Update each chart using their id and options to change the theme/colors
    ApexCharts.exec(barChartId, 'updateOptions', barTypes.barThemeUpdate(theme));
    ApexCharts.exec(memChartid, 'updateOptions', barTypes.radialBarThemeUpdate(memChartid, theme));
    ApexCharts.exec(diskChartId, 'updateOptions', barTypes.radialBarThemeUpdate(diskChartId, theme));
    document.getElementById('body')?.classList.toggle('dark');
  }

  return (
    <div class='text-sm' onClick={() => switchTheme()}>
      <Show when={isDark()}>
      <svg class="sun" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </Show>
    <Show when={!isDark()}>
      <div class='flex w-[24px] h-[24px]'>
        <svg class='m-auto' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" ></path>
        </svg>
      </div>
    </Show>
   </div>
  );
};

export default ThemeSwitcher;