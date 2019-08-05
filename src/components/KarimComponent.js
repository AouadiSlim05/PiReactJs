import React, {Component} from 'react';
import { animateScroll } from "react-scroll";
import MessagesList from './MessagesList';
import axios from 'axios';
import img from '../'
import DiscussionList from './DiscussionList';
import UploadImage from './UploadImagesComponent/UploadImage';
import WebcamCapture from './webcamComponenent/WebcamCapture';
import Image from './ImageComponent/Image';


export default  class Content extends Component {
    constructor(props) {
        super(props);
        this.elem = "";
    }

    state = {
        variable: "Name of User",
        userConnectedId: '5cba02e055788f3334c6db69', //à changer!!
        userName:"",
        user : {
            name: "",
            lastname:"",
            email:"",
          },
        message: "", 
        messages: [
            {
                msgBody: 'Hello how can I help you ?', 
                author: 'bot', 
                userId: 10, 
                time: '10:15 am'
            }, 
            {
                msgBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et posuere erat. Sed ullamcorper sagittis turpis eget pretium. Praesent volutpat aliquam tempor. In arcu tellus, scelerisque sed semper quis, ultricies vitae enim', 
                author: 'bot', 
                userId: 10,
                time: '10:15 am'
            }, 
            {
                msgBody: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et posuere erat. Sed ullamcorper sagittis turpis eget pretium', 
                author: 'user', 
                userId: 10,
                time: '10:15 am'   
            }
        ], 

        discussions: [
            {
                userId: 10, 
                nameDiscuss: 'Fedi Bn',
                lastMsg:'Lorem Epsum Dorlor', 
                img: './img/babysitter1.jpg'
            },
            {
                userId: 10, 
                nameDiscuss: 'Fedi Bn',
                lastMsg:'Three ways to get travel discount', 
                img: './img/equipe1.jpg'
            },
            {
                userId: 10, 
                nameDiscuss: 'Fedi Bn',
                lastMsg:'Lorem epsum dolor lasarus de vector...',
                img:'./img/equipe2.jpg'
            },
            {
                userId: 10, 
                nameDiscuss: 'Fedi Bn',
                lastMsg:'Three ways to get travel discount...',
                img:'./img/no-photo.png'
            }
        ]
    }

    componentDidMount()
    {
        this.listDiscuss();
        
    }

    selectDiscuss = (discussion, event) =>
    {
        var element = event.currentTarget; 
        if (document.getElementsByClassName("discussionSelected")[0]) {
            document.getElementsByClassName("discussionSelected")[0].className = "discussion";
        }

        element.className = "discussionSelected";
        var title = document.getElementsByClassName("titleText")[0];
        title.innerHTML = "Loading...";
        var randomTime = (Math.floor(Math.random() * 2) + 1) * 1000;
        //var nom = element.childNodes[1].childNodes[1].innerHTML;
        this.setState({variable:discussion.nameDiscuss });
        this.scrollToBottom(); 
        this.listMsgs(discussion.user);
    }

    writeMsg = (e) => {
        console.log(e.target.value)
        this.setState({
            message: e.target.value
        }); 
        console.log("message : " + this.state.message);
    }

    sendMessage = () => {
        /*var date = new Date.now(); 
        console.log("date " + Date(date)); */
        if (this.state.message != '') {
            this.scrollToBottom();
            console.log(this.state.message);
            const newMsg = {
                msgBody: this.state.message, 
                author: 'user', 
                time: '10:25 am'
            }

            this.setState({
                messages: [...this.state.messages, newMsg]
            });
            
            axios.post('http://localhost:3000/api/claim/AI?value=' + this.state.message)
             .then(res => this.setState({
                 messages: [...this.state.messages, {
                        msgBody: res.data,
                        author: 'bot', 
                        userId: this.state.userConnectedId
                    }]
                }));

            this.setState({
                message: ''
            })

            this.listDiscuss(); 
        }
        
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "scroll"
        });
    }

    listMsgs = (userId) =>{
        axios.get('http://localhost:3000/api/chat/listMsgs?id=' + userId)
         .then(res => this.setState({
             messages: res.data
         }));
    }

    listDiscuss = () => {
        axios.get('http://localhost:3000/api/chat/listDiscuss')
        .then(res => this.setState({
            discussions: res.data
        }));
    }


    changeUserConnected(newUser){
            this.setState({
                user: newUser
            })
    }

    changeName(newName){
        this.setState({
            userName : newName
        })
}

    render(){
        return (
            <div className="mainContent">

            <div className="sideBar">
                <div className="sideHead">
                    <input type="text" name="" className="searchDiscuss" placeholder="Search for a discussion..."/>
                    <i className="fa fa-search" id="searchIcon" aria-hidden="true"></i>
                </div>

                <DiscussionList discussions = {this.state.discussions}  selectDiscuss={this.selectDiscuss}></DiscussionList>

                    <button className="btnMore"><i className="fas fa-sort-down" id="plus"></i> Load More</button>
            </div>

            <div className="content" >
                <div className="contentHead">
                    <div className="infosIcons">
                        <div className="tooltip">

                            <i className="fas fa-phone" style={{transform: 'scaleX(-1)'}}></i>
                            <span className="tooltiptext">Listen</span>
                        </div>
                        <div className="tooltip">

                            <i className="fas fa-video"></i>
                            <span className="tooltiptext">Bookmark</span>
                        </div>
                    </div>

                    <div className="title">
                        <h3 className="titleText" id="headertag">{this.state.user.name}</h3>

                        <p className="online">ONLINE</p>
                    </div>

                    <div className="infosIcons">
                        <div className="tooltip">
                            <i className="fas fa-info-circle"></i>
                            <span className="tooltiptext">Infos</span>
                        </div>
                        <i className="fas fa-ellipsis-v" ></i>
                    </div>
                </div>

                <div className="footerContent">
                    <i className="fas fa-angle-right" id="sendAttachIcon"></i>
                    <input type="text" name="" className="msgInput" placeholder="Type a message..." style={{marginTop: '32px'}} onChange={this.writeMsg} value={this.state.message}/>
                    <i className="far fa-paper-plane" id="sendIcon" onClick={this.sendMessage}></i>
                    <i className="fas fa-paperclip"  id="sendIcon"></i>
                </div>

                <div style={{overflowY: 'scroll', height:'80%', marginRight: '2px'}} className="scroll" id="scroll">
                <div className="messages" style={{display: 'inline-block'}} id="messages">
                    {/* <MessagesList messages={this.state.messages}></MessagesList> */}
                    <Image changeName={this.changeName.bind(this)}></Image>
                    <UploadImage name={this.state.userName}></UploadImage>
                    <WebcamCapture changeUser={this.changeUserConnected.bind(this)}></WebcamCapture> 
                    <br></br>
                    <br></br>
                </div>
                </div>

            </div>
        </div>
        );
    }
}
