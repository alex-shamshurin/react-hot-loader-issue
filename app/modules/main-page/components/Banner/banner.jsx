import React from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './banner.module.styl';

const cx = classNames.bind(styles);

const Banner = () => {
  return (
  <div>
    <h1>Hallo, I want to work with RHL 3</h1>
     <section className={cx("banner")}>banner</section>
  </div>
   
  );
};

export default withStyles(styles)(Banner);
