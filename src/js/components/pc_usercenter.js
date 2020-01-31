import React from 'react';
import {Row, Col} from 'antd';
import {
		Icon, 
		Tabs, 
		Card,
		Button, 
		Modal,
		Upload
	} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
	constructor(){
		super();
		this.state = {
			userComments: '',
			userCollection: '',
			perviewVisible: false,
			previewImg: ''
		};
	};


	componentDidMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).
		then(response => response.json()).
		then(json => {this.setState({userCollection: json});});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions).
		then(response => response.json()).
		then(json => {this.setState({userComments: json})});
	};


	handleCancel(){

	};

	render(){
		const props = {
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			headers: {
				"Access-Control-Allow-Origin":"*"
				},// 跨域传输必备
			listType: 'picture-card', 
			defaultFileList:[
			{
				uid:-1,
				name:'xxx.png',
				state: 'done',
				url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
				thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			],
			onPreview: (file)=>{
				this.setState({previewImage:file.url, previewVisible:true});
			}
		};

		const {userCollection} = this.state;
		const userCollectionList = userCollection.length ?
			userCollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>View</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
			:
			"Nothing in your collection, go and get some!";

		const {userComments} = this.state;
		const userCommentsList = userComments.length ?
		userComments.map((content, index) => (
			<Card key={index} title={'You commented news ${content.uniquekey} at ${content.datetime}'} extra={<a href={'/#/details/${content.uniquekey}'} target='_blank'>View</a>}>
					<p>{content.Comments}</p>
			</Card>
		))
		:
		"You haven't commented any news yet";

		return(
			<div>
			<PCHeader/>
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<Tabs>

						<TabPane tab='My Collections' key='1'>
							<div class="comment">
								<Row>
									<Col span={24}>{userCollectionList}</Col>
								</Row>
							</div>
						</TabPane>

						<TabPane tab='My Profile' key='2'>
							<div class="clearfix">
								<Upload {...props}>
									<Icon type="plus"/>
									<div className='ant-upload-text'>上传照片</div>
									<Modal visible={this.state.perviewVisible} footer={null} onCancel={this.handleCancel}>
										<img alt="预览" src={this.state.previewImg} />
									</Modal>
								</Upload>
							</div>

						</TabPane>
						<TabPane tab='My Comments' key='3'>
							<div class="comment">
								<Row>
									<Col span={24}>{userCommentsList}</Col>
								</Row>
							</div>
						</TabPane>
					</Tabs>
				</Col>
				<Col span={2}/>
			</Row>
			<PCFooter/>
			</div>
		);
	};
}