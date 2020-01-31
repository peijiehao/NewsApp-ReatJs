import React from 'react';
import {Row, Col} from 'antd';
import {Menu, 
		Tabs, 
		Form, 
		Input, 
		Button, 
		Card,
		notification,
		message
	} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class CMComments extends React.Component{
	constructor(){
		super();
		this.state = {
			comments : ""
		};
	};

	handleSubmit(){
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).
		then(response => response.json()).
		then(json => {
			this.componentDidMount();
		});
	};

	componentDidMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).
		then(response => response.json()).
		then(json => {
				this.setState({comments: json});
			});
	};

	addUserCollection(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).
		then(response => response.json()).
		then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	};

	render(){
		let {getFieldProps} = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length?
			comments.map((content, index)=>(
				<Card key={index} title={content.UserName} extra={<a href='#'>发布于{content.datetime}</a>}>
					<p>{content.Comments}</p>
				</Card>
			))
			:
			"没有加载到任何评论"
		return(
			//若使用getFieldProps必须写这个：
			<div class='comment'>
				<Row>
					<Col span={24}>
						{commentList}
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label='您的评论'>
								//...用来从内向外传参，这里意思是将输入传给remark，设置remark初始值为空
								<Input type='textarea' placeholder='请输入您的评论' {...getFieldProps('remark', {initialValue: ''})}/> 
							</FormItem>
							<Button type="primary" htmlType="submit">提交</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CMComments = Form.create({})(CMComments);