import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Banner from '../../components/Banner'
import Text from '../../components/Text'
import {swal}  from '../../../../actions'

class MainPageLayout extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
  }
  
  render() {
    return (
      <section className="content">
        <section className="page">
          <Banner/>
          <Text/>
        </section>
      </section>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    //for example
    sweetAlertData: state.activeRoute,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //sweet alert actions
    swalActions    : () => bindActionCreators(swal, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageLayout)
