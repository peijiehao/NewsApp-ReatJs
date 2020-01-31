import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCContainer from './pc_news_container';

export default class PCIndex extends React.Component {
	render() {
		return (
			<div>
				<PCHeader/>
				<PCContainer/>
				<PCFooter/>
			</div>
		);
	};
}