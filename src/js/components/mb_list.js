import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import Tloader from 'react-touch-loader';

export default class MBList extends React.Component{
	constructor(){
		super();
		this.state = {
			news: '',
			count: 5,//默认加载五条新闻，下拉加载更多
			hasMore: 0,
			initializing: 1,//组建初始化状态
			refreshedAt: Date.now()
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

	loadMore(resolve){
		setTimeout(()=>{
			var count = this.state.count;
			this.setState({count: count + 5});

			var myFetchOptions = {
			method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
			.then(response => response.json())
			.then(json => this.setState({news: json}));

			this.setState({hasMore: count > 0 && count < 50});
			resolve();
		}, 2e3);
	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({
				hasMore: 1,
				initializing: 2
			});
		}, 2e3)
	};

	render(){
		var {hasMore, initializing, refreshedAt} = this.state;
		const {news} = this.state;
		const newsList = news.length
		?
		news.map((content, index)=>(
			<section key={index} className="m_article list-item specical-section clearfix">
				<Link to={`details/${content.uniquekey}`}>
					<div className='m_article_img'>
						<img src={content.thumbnail_pic_s} alt={content.title} />
					</div>
					<div className='m_article_info'>
						<div className='m_article_title'><span>{content.title}</span></div>
						<div className='m_article_desc clearfix'>
							<div className='m_article_desc_l'>
								<span className='m_article_channel'>{content.realtype}</span>
								<span className='m_article_time'>{content.date}</span>
							</div>
						</div>
					</div>
				</Link>
			</section>
			))
		:
		'没有加载到任何新闻';

		return(
			<div>
				<Row>
					<Col span={24}>
						<Tloader className='main' onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
							{newsList}
						</Tloader>
					</Col>
				</Row>
			</div>
		);
	};
}