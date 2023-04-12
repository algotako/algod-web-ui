import { lazy } from 'solid-js'

const DashboardStatsGrid = lazy(() => import("../../components/DashboardStatsGrid"));

const Dashboard = () => {

  return (
    <div class='flex flex-col gap-4'>
      <DashboardStatsGrid />
      <div class='flex flex-row gap-4 w-full'>
        Chart
        Pie
      </div>
      <div class='flex flex-row gap-4 w-full'>
        Logs
      </div>
    </div>
  )
};

export default Dashboard;