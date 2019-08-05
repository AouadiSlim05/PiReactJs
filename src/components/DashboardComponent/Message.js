import React, { Component } from 'react'
import Points from './Points';
import Image from '../ImageComponent/Image';
import WebcamCapture from '../webcamComponenent/WebcamCapture';
import UploadImage from '../UploadImagesComponent/UploadImage';

export default class Message extends Component {
    state = {
        classEltName: '', 
        answeringMsg: ''
    }

    componentDidMount = () =>
    {
        this.mood();
    }

  clickThisMsg = (msgBody) => {
        this.props.clickMsg(msgBody);
    }

    callUserName = (name) => {
        this.props.getUserName(name); 
    }

  mood = ()=> {
    if(this.props.average < -0.5) {
        this.setState({
            classEltName: "messageElementRed", 
            answeringMsg: "I am warning you, stop being aggressive.\n" + this.props.message.msgBody 
        });

    }
    else if ((this.props.average > -0.5)&&(this.props.average < 0)) {
        this.setState({
            classEltName: "messageElementYellow",
            answeringMsg: this.props.message.msgBody 
        });
    }
    else {
        this.setState({
            classEltName: "messageElement",
            answeringMsg: this.props.message.msgBody
        });
    }
  }
  render() {
      if (this.props.message.author == 'bot') {
          
          if ((this.props.message.msgBody != 'registration true') && (this.props.message.msgBody != 'webcam') && (!this.props.message.msgBody.includes('upload'))){
            return (
                <React.Fragment>
                    <div className={this.state.classEltName} onClick={this.clickThisMsg.bind(this, this.props.message.msgBody)}>
                        <p>{this.state.answeringMsg}</p>
                    </div>
                    <br/>
                </React.Fragment>
                
            )
          }
         else if(this.props.message.msgBody == 'registration true') {
            return (
                <Image addMsgAnswer={this.props.addMsgAnswer} callUpload={this.props.callUpload}></Image>
            )
        }
        else if (this.props.message.msgBody == 'webcam') {
            return (
                <WebcamCapture></WebcamCapture>
            )
        }
        else if(this.props.message.msgBody.includes('upload')) {
            var parts = this.props.message.msgBody.split('|'); 
            var userName = parts[1]; 
            
            //console.log(userName); 
            return (
                <UploadImage userName={userName}></UploadImage>
            )
        }
      }
      
      else {
        return (
            <React.Fragment>
                <div className="messageElementInverse">
                    <p>{this.props.message.msgBody}</p>
                    <p className="msgDteInverse"><b>{this.props.message.time}</b></p>
                </div><br/>
            </React.Fragment>
        )
      }
    
  }
}
