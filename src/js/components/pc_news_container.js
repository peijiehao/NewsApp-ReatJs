import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCImgBlock from './pc_img_block';
import PCProduct from './pc_product';
const TabPane = Tabs.TabPane;

export default class PCContainer extends React.Component{

	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 200,
			slidesToShow: 1,
			autoplay: true
		};

		return(
			<div>
				<Row>
					<Col span={2}/>
					<Col span={20} class='container'>
						<div class='leftContainer'>
							<div class='carousel'>
								<Carousel {...settings}>
    								<div><img src='./src/images/1.jpeg'/></div>
    								<div><img src='./src/images/2.jpg'/></div>
    								<div><img src='./src/images/3.jpg'/></div>
    								<div><img src='./src/images/4.jpeg'/></div>
    								<div><img src='./src/images/5.jpg'/></div>
  								</Carousel>
							</div>
							<PCImgBlock count='6' type='yule' width='400px' cardTitle='娱乐头条' imageWidth='112px'/>
						</div>
						<Tabs class='tabs_news'>
							<TabPane tab='Top' key='1'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='International' key='2'> 
								<PCNewsBlock count={22} type='guoji' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='Sociaty' key='3'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='Science' key='4'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='National' key='5'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='Sports' key='6'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>
							<TabPane tab='Fashion' key='7'> 
								<PCNewsBlock count={22} type='top' width='100%' bordered='false' />
							</TabPane>						
						</Tabs>
						<Tabs class='tabs_product'>
							<TabPane tab='ReactNews Products' key='1'>
								<PCProduct/>
							</TabPane>
						</Tabs>
						<div>
							<PCImgBlock count='8' type='guoji' width='100%' cardTitle='国际头条' imageWidth='160px'/>
							<PCImgBlock count='8' type='guonei' width='100%' cardTitle='国内头条' imageWidth='160px'/>
						</div>
					</Col>
					<Col span={2}/>
				</Row>
			</div>
		);
	};
}