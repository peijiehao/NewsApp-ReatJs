import React from 'react';
import MBHeader from './mb_header';
import MBFooter from './mb_footer';
import MBGuider from './mb_guider';


export default class MBIndex extends React.Component{
	render(){
		return(
			<div>
				<MBHeader/>
				<MBGuider/>
				<MBFooter/>
			</div>
		);
	};
}