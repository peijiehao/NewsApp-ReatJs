import React from 'react';
import {Icon, 
		Tabs, 
		Input, 
		Button, 
		Carousel
	} from 'antd';
import MBList from './mb_list';
const TabPane = Tabs.TabPane;

export default class MBGuider extends React.Component{
	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 200,
			slidesToShow: 1,
			autoplay: true
		};

		return(
			<Tabs defaultActiveKey='1'>
				<TabPane tab="头条" key='1'>
					<div class='carousel'>
						<Carousel {...settings}>
    						<div><img src='./src/images/1.jpeg'/></div>
    						<div><img src='./src/images/2.jpg'/></div>
    						<div><img src='./src/images/3.jpg'/></div>
    						<div><img src='./src/images/4.jpeg'/></div>
    						<div><img src='./src/images/5.jpg'/></div>
  						</Carousel>
					</div>
					<MBList count={20} type='top'/>
				</TabPane>
				<TabPane tab="社会" key='2'><MBList count={10} type='shehui'/></TabPane>
				<TabPane tab="国际" key='3'><MBList count={10} type='guoji'/></TabPane>
				<TabPane tab="娱乐" key='4'><MBList count={10} type='yule'/></TabPane>
				<TabPane tab="体育" key='5'><MBList count={10} type='tiyu'/></TabPane>
				<TabPane tab="科技" key='6'><MBList count={10} type='keji'/></TabPane>
			</Tabs>
		);
	};
}
