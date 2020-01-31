import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCImgBlock from './pc_img_block';
import CMComments from './common_comments';

export default class PCNewsDetail extends React.Component{
	constructor(){
		super();
		this.state = {
			newsItem: ''
		};
	};

	createMarkup(){
		return {__html: this.state.newsItem.pagecontent}
	};

	componentDidMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).
		then(response => response.json()).
		then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};

	render(){
		return(
			<div>
			<PCHeader/>
			<Row>
				<Col span={2}/>
				<Col span={14} className="container">
					<div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}/>
					<hr/>
					<CMComments uniquekey={this.props.params.uniquekey}/>
				</Col>
				<Col span={6}>
					<PCImgBlock count={40} type='top' width='100%' cardTitle='相关新闻' imageWidth={150}/>
				</Col>
				<Col span={2}/>
			<BackTop/>
			</Row>
			<PCFooter/>
			</div>


		);
	};

}