import React from 'react';
import {Row, Col} from 'antd';
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

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MBHeader extends React.Component{
	constructor(){
		super();
		this.state={
			current: 'top',//which item in the guiding part is chosen defaultly
			modalVisible: false,//whether visible or not
			action: 'login',//idicats wether login or register
			hasLogined: false,
			userNickName: '',
			userid: 0
		}
	}
	componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	};

	setModalVisible(value){
		this.setState({modalVisible: value});
	};

	handleClick(e){
		if(e.key == "register"){
			this.setState({current: "register"});
			this.setModalVisible(true);
		}
		else{
			this.setState({current: e.key});
		}
	};

	handleSubmit(e){
		// 页面向API提交数据
		e.preventDefault();//阻止跳转到对应url
		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();//获得所有参数值
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.username+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		});//第一个then参数格式化，第二个设置本地state, NickUserName是API返回值
		if(this.state.action=="login"){
			this.setState({hasLogined: true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};


	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};

	login(){
		this.setModalVisible(true);
	};

	logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	}

	render(){
		const {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined
		?
		<span>
			<Link to={'/usercenter'} target="_blank">
				<Icon type="inbox"/>
			</Link>
			&nbsp;&nbsp;
			<Icon type="user-delete" onClick={this.logout.bind(this)}/>
		</span>
		:
		<Icon type="setting" onClick={this.login.bind(this)}/>
		
		return(
			<div id="mobile">
        		<header>
          			<img src="./src/images/logo.png" alt="logo"/>
          			<span>ReactNews</span>
					{userShow}
        		</header>
        		<Modal title='Customer Center' wrapClassName='vertical-center-modal' visible = {this.state.modalVisible} 
					footer={[<Button key="back" size="large" onClick={() => this.setModalVisible(false)}>取消</Button>]}
					onCancel={()=>{this.setModalVisible(false)}}>
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="登录" key="1">
							<Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
											{getFieldDecorator('username', {
            									rules: [{ required: true, message: 'Please input your UserName!' }],})(
            											<Input placeholder="请输入您的账号" />)}
								</FormItem>
								<FormItem label="密码">
											{getFieldDecorator('password', {
            									rules: [{ required: true, message: 'Please input your Password!' }],})(
            											<Input type="password" placeholder="请输入您的密码" />)}
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
											{getFieldDecorator('r_userName', {rules: [{ required: true, message: 'Please input your UserName!' }],})(
            											<Input placeholder="请输入您的账号" />)}
								</FormItem>
								<FormItem label="密码">
											{getFieldDecorator('r_password', {
            										rules: [{ required: true, message: 'Please input your Password!' }],
          												})(
            											<Input type="password" placeholder="请输入您的密码" />
          												)}
								</FormItem>
								<FormItem label="确认密码">
											{getFieldDecorator('r_confirmPassword', {
            										rules: [{ required: true, message: 'Please confirm your Password!' }],
          												})(
            											<Input type="password" placeholder="请确认您的密码" />
          												)}
								</FormItem>
								<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
        	</div>
		);
	};
}

export default MBHeader = Form.create({})(MBHeader);

