import { lazy } from 'solid-js'
import AlgodLogs from '~/components/AlgodLogs';
//import RadialBar from '~/components/RadialBar';
//import VotingChart from '~/components/VotingChart';

const DashboardStatsGrid = lazy(() => import("../../components/DashboardStatsGrid"));
const VotingChart = lazy(() => import("../../components/VotingChart"));
const RadialBar = lazy(() => import("../../components/RadialBar"));

const Dashboard = () => {

  return (
    <main class='flex flex-col gap-4 w-full'>
      <DashboardStatsGrid />
      <div class='flex gap-4 w-full'>
        <VotingChart />
        <RadialBar />
      </div>
      <div class='flex flex-row gap-4 w-full'>
        <AlgodLogs />
      </div>
    </main>
  )
};

export default Dashboard;