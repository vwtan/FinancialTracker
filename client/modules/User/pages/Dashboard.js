import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/Dashboard.css';
import Card from '../components/Dashboard/DashboardCard';

export function Dashboard(props) {
  return (
    <div className={styles.dashmain}>
      <Card style="card-1"> Content </Card>
      <Card style="card-2"> Wider Content </Card>
      <Card style="card-3"> Widest Content </Card>
    </div>
  );
}
export default Dashboard;
