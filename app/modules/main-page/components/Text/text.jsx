import React from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './text.module.styl';

const cx = classNames.bind(styles);

const Text = ({children}) => {
  return (
    <section className={cx("text")}>
      <div className="container">
        <div className={cx("text-group")}>
          <h3>How to pay for this</h3>
          <p className={cx("text-group-description")}>In short, <a href="#">We get this</a></p>
          <div className={cx("payment-method")}>
            <ul className={cx("payment-method-list")}>
              <li className={cx("payment-method-item--visa")} title="Visa, Visa Electron"/>
              <li className={cx("payment-method-item--mastercard")} title="Mastercard, Maestro"/>
              <li className={cx("payment-method-item--paypal")} title="PayPal"/>
              <li className={cx("payment-method-item--webmoney")} title="WebMoney"/>
            </ul>
            <ul className={cx("payment-method-list")}>
              <li className={cx("payment-method-item--american")} title="American Express"/>
              <li className={cx("payment-method-item--jcb")} title="JCB"/>
              <li className={cx("payment-method-item--diners")} title="Diners Club"/>
              <li className={cx("payment-method-item--money")} title="Cash"/>
              <li className={cx("payment-method-item--bank")} title="bank"/>
            </ul>
          </div>
        </div>
        <div className={cx("text-group")}>
          <h3>How to get it</h3>
          <p className={cx("text-group-description")}>This is a very long text<a href="#">la la la</a>.</p>
        </div>
        <div className={cx("text-group")}>
          <h3>Ticket</h3>
          <p className={cx("text-group-description")}>This is a very long text
          </p>
        </div>
        <div className={cx("text-group")}>
          <h3>Cash back</h3>
          <p className={cx("text-group-description")}>Buy online <a href="#">money back</a>.</p>
        </div>
        <div className={cx("text-group--line")}>
          <p className={cx("text-group-description--separate")}>Details <a href="#">about</a>, <a href="#">tickets</a>, <a
            href="#">routes</a> и <a href="#">rules</a> read about <a href="#">help</a>.</p>
          <h3>Prices</h3>
          <ul className={cx("text-group--list")}>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
           <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
          </ul>
          <ul className={cx("text-group--list")}>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
           <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
            <li><a href="#">New-Your — Syndey</a>&nbsp;...&nbsp;from 280 $&nbsp; </li>
          </ul>
          <p className={cx("text-group-description")}>Real prices</p>
        </div>
      </div>
    </section>
  );
};

export default withStyles(styles)(Text);
