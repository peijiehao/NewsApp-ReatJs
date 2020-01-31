import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import MBIndex from './components/mb_index';
import PCNewsDetail from './components/pc_news_detail';
import MBNewsDetail from './components/mb_news_detail';
import PCUserCenter from './components/pc_usercenter';
import MBUserCenter from './components/mb_usercenter';


export default class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}></Route>
            <Route path='/details/:uniquekey' component={PCNewsDetail}></Route>
            <Route path='/usercenter' component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={MBIndex}></Route>
            <Route path='/details/:uniquekey' component={MBNewsDetail}></Route>
            <Route path='/usercenter' component={MBUserCenter}></Route>
          </Router>
        </MediaQuery> 
      </div>
    );
  };
}

ReactDOM.render(
  <Root/>, document.getElementById('mainContainer'));