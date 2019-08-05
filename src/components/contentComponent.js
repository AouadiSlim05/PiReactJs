import React, {Component} from 'react';
import { animateScroll } from "react-scroll";
import MessagesList from './MessagesList';
import axios from 'axios';
import img from '../'
import DiscussionList from './DiscussionList';
import SpeechComponent from './SpeechComponent';
import AudioCall from './AudioCall';
import WebcamCapture from './webcamComponenent/WebcamCapture';

export default  class Content extends Component {
    constructor(props) {
        super(props);
        this.elem = "";
    }

    state = {
        variable: "Name of User",
        userConnectedId: '5cba02e055788f3334c6db69', //à changer!!
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
        ], 
        average: 0, 
        response: '', 
        registration: false, 
        webcamCall: false,
        audioCall: false, 
        nameConnected: ''
    }

    componentDidMount = () =>
    {
        this.listDiscuss();
        var input = document.getElementById("inputMsg");
        input.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
              this.sendMessage();
            }
          });
          
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
    }


    sendMessage = () => {
        var date = new Date().toTimeString().substr(0,5); 
        console.log("date " + Date(date)); 
        if (this.state.message != '') {
            this.scrollToBottom();
            console.log(this.state.message);
            const newMsg = {
                msgBody: this.state.message, 
                author: 'user', 
                time: date
            }

            this.setState({
                messages: [...this.state.messages, newMsg]
            });
            
            var randomTime = (Math.floor(Math.random() * 3) + 1) * 1000;

            setTimeout( () => {
                axios.post('http://localhost:3000/api/claim/AI?value=' + newMsg.msgBody)
                .then(res => {this.splitAnswer(res.data)});
                this.scrollToBottom();  
                this.listDiscuss();  
            }, 700)
            

            this.setState({
                message: ''
            })

            this.listDiscuss(); 
        }
        
    }

    sendMessageAudio = (speech) => {
        var date = new Date().toTimeString().substr(0,5); 
        console.log("date " + Date(date)); 
        if (speech != '') {
            this.scrollToBottom();
            const newMsg = {
                msgBody: speech, 
                author: 'user', 
                time: date
            }
            
            this.setState({
                messages: [...this.state.messages, newMsg]
            });

            setTimeout( () => {
                axios.post('http://localhost:3000/api/claim/AI?value=' + newMsg.msgBody)
                .then(res => {this.splitAnswer(res.data)});
                this.scrollToBottom();  
                this.listDiscuss();  
            }, 700)
            

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

    splitAnswer = (stringAnswer) => {
        this.handleRegistration(stringAnswer); 
        var phrase = this.getAvg(stringAnswer); 
        var parts = phrase.split("*");
        this.setState({response: phrase}); 

        if(parts.length) {
            parts.forEach((element, index) => {
                const msgWriting = {
                    msgBody: element,
                    author: 'bot', 
                    userId: this.state.userConnectedId,
                    writing: true
                }; 
                if(element != ''){
                    this.setState({messages: [...this.state.messages, msgWriting]});
                    var timeIndex;
                    index == 0 ? timeIndex = 1 : timeIndex = index
                    var randomTime = ((Math.random() * 3) + 1) * 1000;
                    setTimeout(() => {
                        this.setState({ messages: this.state.messages.map((msg) => {
                            if(msg.msgBody == element) {
                                msg.writing = false;
                            }

                            if (element )
                            return msg
                        })});
                        this.scrollToBottom();  
                    }, timeIndex * randomTime)
                }
            });
        }
       
    }

    clickMsg = (messageText) => {
        this.setState({message: messageText}, () => {this.sendMessage()});
    }

    getAvg = (stringTosplit) => {
        var parts = stringTosplit.split('|');
        this.setState({
            average: parts[1]
        })
        return parts[0];
    }

    moodChange = () => {
        
    }

    addMsgAnswer = (element) => {
        const newMsg = {
            msgBody: element, 
            author: 'bot', 
            userId: this.state.userConnectedId
        }
        this.setState({messages: [...this.state.messages, newMsg]}); 
        this.scrollToBottom(); 
    }

    checkRegistration = (element) => {
        var dialogueRegister = ["Okay let's get you registred", "Welcome on board", "We are glad you can join us, let's sign you up"]; 
        var bool = false; 
        for (var i = 0; i < dialogueRegister.length; i++) {
            if(element.includes(dialogueRegister[i])) {
                bool = true; 
            }
        }
        return bool; 
    }

    handleRegistration = (element) => {
        if (this.checkRegistration(element)) {
            this.setState({registration: true}); 
            var newMsg = {
                    msgBody: 'registration true',
                    author: 'bot', 
                    userId: this.state.userConnectedId,
                    writing: true
            }
            setTimeout(() => {
                this.setState({
                    messages: [...this.state.messages, newMsg]
                })
            }, 500)
            
        }
        else {
            this.setState({registration: false});
        }
    }

    callWebcam = () => {
        this.setState({webcamCall: true}); 
        var newMsg = {
            msgBody: 'webcam',
            author: 'bot', 
            userId: this.state.userConnectedId,
            writing: false
         }
            this.setState({
                messages: [...this.state.messages, newMsg]
            }) 
            this.scrollToBottom(); 
    }

    openCloseAudioCall = () => {
        this.setState({audioCall: !this.state.audioCall}); 
    }

    openCloseWebcam = () => {
        this.setState({webcamCall: !this.state.webcamCall});
    }

    callUpload = (nameUser) => {
        var newMsg = {
            msgBody: 'upload'+'|'+nameUser,
            author: 'bot', 
            userId: this.state.userConnectedId,
            writing: false
         }
            this.setState({
                messages: [...this.state.messages, newMsg]
            }) 
            this.scrollToBottom(); 
    }

    predictUser = (nameUser) => {
       // var nameUser = 'Abdelkarim Turki' //this.state.nameConnected; 
        alert(nameUser); 
        var newMsg = {
            msgBody: nameUser + ' is now Logged In', 
            author: 'bot', 
            userId: this.state.userConnectedId,
            writing: false
         }
            this.setState({
                messages: [...this.state.messages, newMsg], 
                userConnectedId: '' /**IPORTANT */
            }) 
            this.scrollToBottom(); 
    }

    getUserName = (name) => {
        this.setState({nameConnected:name}); 
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
                            <i className="fas fa-phone" style={{transform: 'scaleX(-1)'}} onClick={this.openCloseAudioCall}></i>
                            <span className="tooltiptext">Listen</span>
                        </div>
                        <div className="tooltip">
                            <i className="fas fa-video" onClick={this.openCloseWebcam}></i>
                            <span className="tooltiptext">Open Webcam</span>
                        </div>
                    </div>

                    <div className="title">
                        <h3 className="titleText" id="headertag">{this.state.variable}</h3>
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
                    <input type="text" id="inputMsg" className="msgInput" placeholder="Type a message..." style={{marginTop: '32px'}} onChange={this.writeMsg} value={this.state.message}/>
                    <i className="far fa-paper-plane" id="sendIcon" onClick={this.sendMessage}></i>
                    <i className="fas fa-paperclip"  id="sendIcon"></i> 
                </div>

                { this.state.audioCall?<AudioCall botResponce={this.state.response} sendMessageAudio={this.sendMessageAudio} openCloseAudioCall={this.openCloseAudioCall}></AudioCall>:null }
                { this.state.webcamCall?<WebcamCapture predictUser={this.predictUser}></WebcamCapture>:null }

                <div style={{overflowY: 'scroll', height:'80%', marginRight: '2px'}} className="scroll" id="scroll">
                <div className="messages" style={{display: 'inline-block'}} id="messages">
                    <MessagesList messages={this.state.messages} clickMsg={this.clickMsg} average={this.state.average} addMsgAnswer={this.addMsgAnswer} callUpload={this.callUpload} getUserName={this.getUserName}></MessagesList>
                    <br></br>
                    <br></br>
                </div>
                   
                </div>
            </div>
        </div>
        );
    }
}
