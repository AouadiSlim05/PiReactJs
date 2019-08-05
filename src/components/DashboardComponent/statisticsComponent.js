import React, { Component } from 'react'
import SideBar from '../sideBarComponent';
import Dashbord from './dashboardComponent';
import SFMStats from './SFMStats';
import AgentStats from './AgentStats';
import Statistics from '../DashboardComponent/statisticsComponent';

class statisticsComponent extends Component {
  constructor(props){
    super(props);
    this.state={
          etat:"oui",
          title:"Discussions",
          selected:0
    }
    
  }

   getSelectedMenu = (MenuTitle) =>{
this.setState({title:MenuTitle}, function () {
  //console.log(this.state.title);
});
  }

  selectMenu=(index)=>{
  
   this.setState({title:index}, function () {
    console.log(this.state.title);
  });
   
  }

  

  
  render() {
 
    
    return (
      <React.Fragment> 
      
     
         <div className="Stats">
          <div onClick={()=>this.props.changeTitle("SFMStats")}  className="insuranceStatistics">
              <h1>SFM Insurance Statistics</h1>
              <img src="./SFM.png"/>
          </div>
        
          <div  onClick={()=>this.props.changeTitle("AgentStats")} className="AIAgentStatistics">
          <h1>Ai Agent Statistics</h1>
          <img   src="./img/AiAgent.png"/>
          </div>
         </div>
      
      
      </React.Fragment>   
    )
  }

  
}
export default statisticsComponent;