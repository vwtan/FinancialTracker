import React from 'react';
import { Link } from 'react-router';

import styles from '../../styles/Dashboard.scss';


export function DashboardCard(props) {
  return (
    <div className={styles[props.stylename]}>
      {props.children}
    </div>
  );
}

DashboardCard.propTypes = {
  children: React.PropTypes.node,
  stylename: React.PropTypes.string,
};

export default DashboardCard;
