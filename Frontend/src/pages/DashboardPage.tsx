import { motion } from 'framer-motion';
import { useProfileStore } from '../store/profileStore';
import StudentDashboardPage from './StudentDashboardPage';
import ProfessionalDashboardPage from './ProfessionalDashboardPage';

export default function DashboardPage() {
  const { dashboardType } = useProfileStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {dashboardType === 'student' ? <StudentDashboardPage /> : <ProfessionalDashboardPage />}
    </motion.div>
  );
}
