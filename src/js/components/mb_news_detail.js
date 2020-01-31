import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MBHeader from './mb_header';
import MBFooter from './mb_footer';
import CMComments from './common_comments';

export default class MBNewsDetail extends React.Component{
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
			<div id='mobileDetailsContainer'>
				<MBHeader/>
				<Row>
					<Col span={24}>
						<div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}/>
						<hr/>
						<CMComments uniquekey={this.props.params.uniquekey}/>
					</Col>
				</Row>
				<BackTop/>
				<MBFooter/>
			</div>


		);
	};

}