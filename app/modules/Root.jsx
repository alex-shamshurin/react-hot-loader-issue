import React, {Component, PropTypes} from 'react';
import DevTools from './DevTools';
import Layout from './common/containers/Layout';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false}
  }

  componentDidMount() {
    this.setState({isMounted: true})
  }

  render() {
    return (
      <div>
        <Layout children={this.props.children} isMounted={this.state.isMounted}/>
        {__DEVCLIENT__ && this.state.isMounted && <DevTools />}
      </div>
    )
  }
}

export default Root;
