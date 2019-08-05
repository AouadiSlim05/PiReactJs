import React, { Component } from 'react'
const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition(); 
const ms = require('pretty-ms')

var latestFrequency;
var score =0;
var cmpt = 0;
recognition.continous = true
recognition.lang = 'en-US'
recognition.interimResults = false; //default false
recognition.maxAlternatives = 1; //default 1
      //add custom properties
      recognition.transcript = [];
      recognition.useTimeout = true; //enable stop after x seconds of receiving no results
			recognition.counterMaxTime = 60; //time to countdown in seconds
      recognition.confidenceTreshold = 0.25; //treshold for result selection

var audio = new Audio("./img/phone.mp3"); 
export default class AudioCall extends Component {

    state = {
        test: true, 
        listening: false, 
        listen: false, 
        msgBody: '', 
        time: 0,
        start: 0,
        isOn: false, 
        classLogo: 'logoBot'
    }
    componentDidUpdate(prevProps) {
        if (this.props.botResponce !== prevProps.botResponce) {
            this.synthesizeSplit();
        }
    }

    componentDidMount = () => {
        audio.play();
        
        setTimeout(() => {
            audio.pause(); 
            this.toggleListen(); 
            this.startTimer();  
        }, 6000)
    }

    synthesizeSplit = () => {
        console.log(this.props.botResponce); 
        var splitedByAsterix = this.props.botResponce.split('*'); 
        splitedByAsterix.forEach((element, index, array) => {
            if(this.state.test) {
                if(Object.is(array.length-1, index)) {
                    this.synthesizeElement(element, true);
                }
                else {
                    var splitedByLine = element.split('\n'); 
                    splitedByLine.forEach(elementLine => {
                        this.synthesizeElement(elementLine, false); 
                    })
                }
                this.setState({test: false}); 
            }
            var randomTime = (Math.floor(Math.random() * 1000) + 0);
            console.log(randomTime); 
            setTimeout(this.setState({test: false}), randomTime); 
        });
        //this.toggleListen(); 
    }

    synthesizeElement = (text, reachedEnd) => {
        const speakText = new SpeechSynthesisUtterance(text);
		console.log(text)
		console.log(synth.getVoices())
		console.log(synth.getVoices()[4])
		speakText.voice=synth.getVoices()[4]
		speakText.lang="en-GB"

		if (synth.speaking) {
			console.error('Already speaking...');
        }
        this.setState({classLogo: 'logoBotTalking'});

		speakText.onend = () => {
            console.log("On end"); 
            this.setState({test: true})
            this.setState({classLogo: 'logoBot'}); 
            if (reachedEnd){
                this.toggleListen(); 
            }
        };
        
		speakText.onerror = e => {
			console.error('Something went wrong');
		};
		synth.speak(speakText);
		speakText.onaudioend= ()=>{
			console.log('kamalt')
		}		
    }

    toggleListen = () => {
        this.setState({
            listening: true,
        }, this.handleListen)
    }

    

handleListen = () => {

	if (this.state.listening) {
        console.log(this.state.listening)
		recognition.start()
        recognition.onstart = () => {
            console.log("Listening!")
        }

	} else {
		recognition.stop()
		recognition.onend = () => {
			this.setState({
				listen:false
			})
		}
    }
    
    recognition.onaudioend  =()=>{
        console.log("onTimeout")
                recognition.onend = () => {
                console.log("Stopped "); 
                this.setState({
                    listen:true
                })
            };
    }
    
    recognition.onresult = event => {
        console.log(event.results[0][0].transcript); 
        this.props.sendMessageAudio(event.results[0][0].transcript); 
    }
    
    
    recognition.onerror = event => {
        console.log("Error occurred in recognition: " + event.error)
    }

}

startTimer() {
	this.setState({
		listening: !this.state.listening,
		time: this.state.time,
		start: Date.now() - this.state.time,
		isOn: true
	})
	this.timer = setInterval(() => {this.setState({
		time: Date.now() - this.state.start
	})} , 1);
}

getTime(time) {
    if (!isNaN(time)) {
        var ms = time;
        ms = 1000*Math.round(ms/1000); // round to nearest second
        var d = new Date(ms);
        var minutes = d.getUTCMinutes(); 
        var sec = d.getUTCSeconds();
        if (d.getUTCMinutes() < 10) {
            minutes = '0' + d.getUTCMinutes();    
        }
        if (d.getUTCSeconds() < 10) {
            var sec = '0' + d.getUTCSeconds();
        }
        var resultat =  minutes + ':' + sec
      return (
            resultat
        );
    }
}

closeCall = () => {
    this.setState({listening: false}); 
    var closeAudio = new Audio('./img/close.m4a'); 
    closeAudio.play(); 
    this.props.openCloseAudioCall(); 
    audio.pause(); 
    recognition.stop(); 
    synth.cancel(); 
}

  render() {
    let start = (this.state.time == 0)
    return (
        
        <div className="audioPanel">
        <div className="textAudioDiv">
            <img src="./img/chatbotOff.png" className={this.state.classLogo}/>
                <p className="audioTitle">Chatbot</p>
                <p className="timerCall">{ this.state.time==0?<b>calling...</b>:this.getTime(this.state.time)}</p>
            </div>

            <div className="buttonsCall">
                <button className="buttons0" onClick={this.closeCall}>
                    <i className="fas fa-phone"></i>
                </button>

                <button className="buttons1" onClick={this.toggleListen}>
                    <i class="fas fa-microphone"></i>
                </button>

                <button className="buttons2">
                    <i class="fas fa-volume-up"></i>   
                </button>
            </div>
            
        </div>
    )
  }
}
