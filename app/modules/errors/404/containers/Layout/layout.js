import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './layout.module.styl';

const cx = classNames.bind(styles);

const Page404 = ({children}) => {
  return (
   <div>
     <h1>404</h1>
     <h2><Link to="/">to main</Link></h2>
   </div>
  );
};

export default withStyles(styles)(Page404);
