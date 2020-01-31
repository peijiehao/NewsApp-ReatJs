import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCImgBlock extends React.Component{
	constructor(){
		super();
		this.state = {
			news: ''
		};
	};

	componentWillMount(){
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
		.then(response => response.json())
		.then(json => this.setState({news: json}));
	};

	render(){
		const styleImage = {
			display: 'block',
			width: this.props.imageWidth,
			height: '90px'
		};
		const styleH3 = {
			width: this.props.imageWidth,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}; //超出长度的文字显示为。。。（三句控制）
		const {news} = this.state;
		const newsList = news.length
		?
		news.map((content, index)=>(
			<div key={index} class='imageblock'>
				<Link to={`details/${content.uniquekey}`} target='_blank'>
					<div class='custom-image'>
						<img alt='' src={content.thumbnail_pic_s} style={styleImage}/>
					</div>
					<div class='custom-card'>
						<h3 style={styleH3}>{content.title}</h3>
						<p>{content.author_name}</p>
					</div>
				</Link>
			</div>
			))
		:
		'没有加载到任何新闻';
		
		return(
			<div class='topNewsList'>
				<Card title={this.props.cardTitle} bordered='true' style={{width: this.props.width}}>
					{newsList}
				</Card>
			</div>
		);
	};
}