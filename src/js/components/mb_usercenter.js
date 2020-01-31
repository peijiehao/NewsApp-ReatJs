import React from 'react';
import {Menu, 
		Icon, 
		Tabs, 
		message,
		Form, 
		Input, 
		Button, 
		CheckBox,
		Modal
	} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import MBHeader from './mb_header';
import MBFooter from './mb_footer';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

export default class MBUserCenter extends React.Component {


	render(){

		return(
			<div>
				<MBHeader/>
				<Tabs>
					<TabPane tab='My Collections' key='1'>



					</TabPane>
					<TabPane tab='My Profile' key='2'>



					</TabPane>
					<TabPane tab='My Comments' key='3'>



					</TabPane>
				</Tabs>
				<MBFooter/>
			</div>
		);
	};
}