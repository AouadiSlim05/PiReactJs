import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Container } from "react-bootstrap";

export default  class SideBar extends Component {
	constructor(props) {
        super(props);
		
		
     this.state={
		selected:true,
		elem:[],
		selectedMenuName:"Discussion",
	}

	}

	
	
	selectMenu(element,index){
	
		var indexSeleced=document.getElementsByClassName("iconsMenuSelected")[0].id;
		this.state.elem[indexSeleced].className="iconsMenu";
		this.state.elem[index].className="iconsMenuSelected";
	//	console.log(element.childNodes[1].innerHTML)
	this.setState({selectedMenuName:element.childNodes[1].innerHTML}, function () {
		this.props.getSelectedMenu(this.state.selectedMenuName); 
		console.log(element.childNodes[1].innerHTML);
   });
	
		
   	 
	}
   
	render(){
        return (
			
			 <Container>
            <div className="bg">
		<img src="./img/SFM.png" className="logoSFM"/><br/>
		<div className="adminTitle">
			<div className="User">
				<img src="./img/equipe1.jpg" className="logoUser"/>
				<div className="connected"></div>
			</div>
			<h3>Fedi Ben Nejma</h3>
			<p className="subtitle">Administrator</p>
		</div>

	</div>
	<div  ref={el => (this.state.elem[0] = el)} onClick={() => this.selectMenu(this.state.elem[0],0)} id="0" className="iconsMenu">
		<i className="fas fa-brain" id="iconMenu"></i>
		<p className="iconTitle">Train AI</p>
	</div>
	
	<div ref={el => (this.state.elem[1] = el)} onClick={() => this.selectMenu(this.state.elem[1],1)} id="1" className="iconsMenu">
		<i className="fas fa-chart-pie" id="iconMenu"></i>
		<p className="iconTitle">Statistic</p>
	</div>
	<br/>
	
	<div  ref={el => (this.state.elem[2] = el)} onClick={() => this.selectMenu(this.state.elem[2],2)} id="2" className="iconsMenu">
		<i className="fas fa-bell" id="iconMenu"></i>
		<p className="iconTitle">Alerts</p>
	</div> 

	<Link to={'/'} className="linkTitle">
	<div ref={el => (this.state.elem[3] = el)} onClick={() => this.selectMenu(this.state.elem[3],3)} id="3" className="iconsMenuSelected">
		<i className="fas fa-comment-alt" id="iconMenu"></i>
		<p className="iconTitle">Discussions</p>
	</div> 
	</Link>

	<div className="footer">
		<p>About us   .   Contact Us   .   User Policy</p>
		<p>Terms and services</p>
	</div>
	
	
	</Container>
        )
    }
     
}