import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Footer from '../../components/Footer'

import * as actions from '../../../../actions'
const {swal} = actions

import styles from './layout.module.styl'
import sweetAlertStyles from 'sweetalert/dist/sweetalert.css'
import datePickerStyles from 'react-datepicker/dist/react-datepicker.css'

let SweetAlert

class Layout extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount = () => {
    SweetAlert = require('sweetalert-react').default
  }
  
  render() {
    const {isMounted, sweetAlertData, sweetAlertActions} = this.props
    return (
      <div>
        {isMounted && SweetAlert &&
        <SweetAlert
          show={sweetAlertData.show}
          title={sweetAlertData.title}
          text={sweetAlertData.text}
          type={sweetAlertData.mode}
          showCancelButton={sweetAlertData.showCancelButton || false}
          cancelButtonText={"Отмена"}
          onConfirm={() => {
            sweetAlertActions.close()
            if (typeof sweetAlertData.onConfirmCallBack == "function") {
              return sweetAlertData.onConfirmCallBack()
            }
          }}
          onCancel={() => {
            if (sweetAlertData.closeOnCancel) {
              sweetAlertActions.close()
            }
            if (typeof sweetAlertData.onCancelCallBack == "function") {
              return sweetAlertData.onCancelCallBack()
            }
          }}
        />}
        <section className="wrapper">
          {this.props.children}
          <Footer/>
        </section>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    sweetAlertData: state.sweetAlert,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sweetAlertActions: bindActionCreators(swal, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(datePickerStyles)(withStyles(styles)(withStyles(sweetAlertStyles)(Layout))))
