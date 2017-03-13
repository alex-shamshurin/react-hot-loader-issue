import React from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './footer.module.styl';

const cx = classNames.bind(styles);

const Footer = ({children}) => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("footer-block")}>
          <p className={cx("footer-phone")}>
            <a className={cx("footer-tel")} href="tel:">00000000</a>&nbsp;
            <a className={cx("footer-tel")} href="tel:">00000000</a>&nbsp;
          </p>
          <a className={cx("footer-order")} href="#">la-ala</a>
        </div>
        <ul className={cx("footer-menu")}>
          <li className={cx("footer-menu-link")}><a href="#">About</a></li>
          <li className={cx("footer-menu-link")}><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);

