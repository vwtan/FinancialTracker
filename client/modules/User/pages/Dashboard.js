import React from 'react';
import { Link } from 'react-router';

import styles from '../styles/Dashboard.scss';
import Card from '../components/Dashboard/DashboardCard';

export function Dashboard(props) {
  return (
    <div className={styles.dashmain}>
      <Card stylename="card-1"> Content </Card>
      <Card stylename="card-1"> Content </Card>
      <Card stylename="card-1"> Content </Card>
      <br />
      <Card stylename="card-2"> Wider Content </Card>
      <Card stylename="card-1"> Content </Card>
      <br />
      <Card stylename="card-3"> Widest Content </Card>
    </div>
  );
}
export default Dashboard;
