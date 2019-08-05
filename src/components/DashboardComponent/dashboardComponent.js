import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import SideBar from '../sideBarComponent';

import Content from '../contentComponent';
import TrainingAIComponent from '../TrainingAIComponent';
import Statistics from '../DashboardComponent/statisticsComponent';
import SFMStats from './SFMStats';
import AgentStats from './AgentStats';

class Dashboard extends Component {

  constructor(props)
  {
    super(props);
   this.state = {
    title:"Discussions",
    loadedContracts:[],
    timestamp: 'no timestamp yet',
    listeInsuranceContracts:[],    
  } 
}

  changeTitle = (newTitle) =>{
    //  alert(newTitle);
       this.setState({title:newTitle});
    }
   
  
  getSelectedMenu = (MenuTitle) =>{
this.setState({title:MenuTitle},function(){});

  }
 

  render() {

   
    if(this.state.title=="Discussions")
    {
        
    return (
      <React.Fragment> 
     <SideBar getSelectedMenu={this.getSelectedMenu}/>
    
   
     <Content/>
   
     </React.Fragment>     
    );
    }
    else if (this.state.title=="Statistic")
    {
      return (
        <React.Fragment> 
       <SideBar getSelectedMenu={this.getSelectedMenu}/>
       <div className="mainContent">
      
       <Statistics title={this.state.title} changeTitle={this.changeTitle} />
       </div>
       </React.Fragment>     
      );
    }
    if(this.state.title=="SFMStats")
    {
      return (
        <React.Fragment> 
       
       <SideBar getSelectedMenu={this.getSelectedMenu}/>
       <div className="mainContent">
       <SFMStats title={this.state.title} />
      </div>
        </React.Fragment>   
      )
    }
    if(this.state.title=="AgentStats")
    {
      return (
        <React.Fragment> 
       
       <SideBar getSelectedMenu={this.getSelectedMenu}/>
       <div className="mainContent">
       <AgentStats title={this.state.title} />
      </div>
        </React.Fragment>   
      )
    }

    else if (this.state.title=="Statistic")
    {
      return (
        <React.Fragment> 
     
       </React.Fragment>     
      );
    }
    else if (this.state.title=="Train AI")
    {
      return (
        <React.Fragment> 
               <SideBar  getSelectedMenu={this.getSelectedMenu}/>
<TrainingAIComponent/>
       </React.Fragment>     
      );
    }
   
         
    return (
      
      <React.Fragment> 
     
     <SideBar  getSelectedMenu={this.getSelectedMenu}/>
    

     <Content/>
     
     </React.Fragment>     
    );
  
  }
}

export default Dashboard;
