import React, { Component } from 'react'
import Message from './DashboardComponent/Message';

export default class MessagesList extends Component {

  

  render() {
    return this.props.messages.map((message, index) => {
          if ((message.writing) && (index == this.props.messages.length - 1)) {
            return(
              <React.Fragment>
                <div className="messageElement">
                    <div className="writing">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <br></br>
              </React.Fragment>
            )  
        }
        else{
          return (<Message message={message} clickMsg={this.props.clickMsg} average={this.props.average} addMsgAnswer={this.props.addMsgAnswer} callUpload={this.props.callUpload} getUserName={this.props.getUserName}/>)
        }
    }
        
    
        
    ); 
  }
}
