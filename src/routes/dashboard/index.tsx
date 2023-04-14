import { lazy } from 'solid-js'
//import RadialBar from '~/components/RadialBar';
//import VotingChart from '~/components/VotingChart';

const DashboardStatsGrid = lazy(() => import("../../components/DashboardStatsGrid"));
const VotingChart = lazy(() => import("../../components/VotingChart"));
const RadialBar = lazy(() => import("../../components/RadialBar"));

const Dashboard = () => {

  return (
    <div class='flex flex-col gap-4'>
      <DashboardStatsGrid />
      <div class='flex flex-row gap-4 w-full'>
        <VotingChart />
        <RadialBar />
      </div>
      <div class='flex flex-row gap-4 w-full'>
        Logs
      </div>
    </div>
  )
};

export default Dashboard;