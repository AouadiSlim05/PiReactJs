import React, { Component } from "react"
//import openSocket from 'socket.io-client';

//const ms = require('pretty-ms')
const synth = window.speechSynthesis;
//const socket = openSocket('http://localhost:5000');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
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
window.AudioContext = window.AudioContext || window.webkitAudioContext;

//------------------------SPEECH RECOGNITION-----------------------------

var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

//------------------------COMPONENT-----------------------------
function subscribeToTimer(cb) {
  /*socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);*/
}

class SpeechComponent extends Component {
  
  constructor(props) {
		
		super(props);
		this.elem="";
    this.user = {
        id: 1,
        avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
        listening: false,
        voices:[],
        slideValue:1,
        slideValue1:1,
        rateValue:1,
        rateValue1:1,
        textvalue:""
		}
		this.toggleListen = this.toggleListen.bind(this)
		this.handleListen = this.handleListen.bind(this)
    this.bot = { id: 0 };
		this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
		this.resetTimer = this.resetTimer.bind(this)
		subscribeToTimer((err, timestamp) => this.setState({ 
			timestamp 
		}));
}

state = {
	messages: [
			{
					author: this.bot,
					timestamp: new Date(),
					text: "Hello, I am here for testing :)))))!",
					textclient:""
			}
	],
	messageClient: [
		{
			timestamp:new Date(),
			text:""
		}
	],
	listen:false,
	currentTime: null,
	duration: null,
	player: "stopped",
	response: false,
  endpoint: "http://127.0.0.1:5000",
	time: 0,
	start: 0,
	isOn: false,
	clicked:false,
	test:''

};

startTimer() {
	this.setState({
		listening: !this.state.listening,
		time: this.state.time,
		start: Date.now() - this.state.time,
		isOn: true
	},this.handleListen)
	this.timer = setInterval(() => this.setState({
		time: Date.now() - this.state.start
	}), 1);
}

synthesize() {
		const speakText = new SpeechSynthesisUtterance(this.props.botResponce);
		console.log(this.props.botResponce)
		console.log(synth.getVoices())
		console.log(synth.getVoices()[4])
		speakText.voice=synth.getVoices()[4]
		speakText.lang="en-GB"

		if (synth.speaking) {
			console.error('Already speaking...');
			return;
		}
		speakText.onend = () => {
			console.log('Done speaking...'+this.state.listening);
			this.handleListen(); 
		};
		// Speak error
		speakText.onerror = e => {
			console.error('Something went wrong');
		};
		synth.speak(speakText);

		speakText.onaudioend= ()=>{
			console.log('kamalt')
		}		
}

stopTimer() {
	console.log(this.state.time+' STOPPPPPPP')

	this.setState({isOn: false})
	clearInterval(this.timer)
}
resetTimer() {
	console.log(this.state.time+' RESETTTTT')
	this.setState({time: 0})
}

componentWillMount(){
	console.log('executé')
	//this.props.checkPayment().then((whatever) => { console.log('resolved')})
	this.props.getPeriod().then((whatever) => { console.log('resolved')})
	this.props.gaininsurance().then((whatever)=>{console.log('resolved')})
}

componentDidMount(){
	//socket.on('hello',data=>{console.log(data);this.state.test=data})
}

getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
/*selectDiscuss(element)
    {

 
              if (document.getElementsByClassName("discussionSelected")[0]) {
            document.getElementsByClassName("discussionSelected")[0].className = "discussion";
        }

        element.className =< "discussionSelected";

        var title = document.getElementsByClassName("titleText")[0];
        title.innerHTML = "Loading...";
        var randomTime = (Math.floor(Math.random() * 3) + 1) * 1000;
        
        var nom = element.childNodes[1].childNodes[1].innerHTML;
        setTimeout(function(){ title.innerHTML = nom;  }, randomTime);
   
     
    }*/



		
addNewMessage = (event) => {
		console.log(this.state.listening+'hhhh')
  	console.log(this.props.getPeriod())
  	console.log(event)
    let botResponce = Object.assign({}, document.getElementById('text').value);
    let messageClientobject =Object.assign({}, document.getElementById('text').value);
    console.log(document.getElementById('text').value)
    console.log(this.props.payment)
    botResponce.text = this.countReplayLength(document.getElementById('text').value);
    botResponce.textclient="";
    botResponce.author = this.bot;
    messageClientobject.textclient = document.getElementById('text').value
		messageClientobject.text=""
		const speakText = new SpeechSynthesisUtterance(botResponce.text);
    console.log(botResponce.text)
  console.log(synth.getVoices())
  console.log(synth.getVoices()[4])
  speakText.voice=synth.getVoices()[4]
	speakText.lang="en-GB"
	
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  speakText.onend = () => {
		console.log('Done speaking...'+this.state.listening);
		this.handleListen()

		
  };
  // Speak error
  speakText.onerror = e => {
    console.error('Something went wrong');
  };
	synth.speak(speakText);

	speakText.onaudioend= ()=>{
		console.log('kamalt')
	}
    this.setState((prevState) => ({
        messages: [
            ...prevState.messages,
        ],
        
    }),
    this.setState(state => ({
      messageClient : [...state.messageClient, messageClientobject],
    })));
    //setTimeout(() => {
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                messageClientobject,
                botResponce
						],
						
            
        }));
    //}, 100);
    document.getElementById('text').value="";
    console.log(this.state.messages)
		console.log(this.state.messageClient)
	
};

countReplayLength = (question) => {
	this.props.getPeriod()
	//socket.on("FromAPI", data => this.setState({ response: data }));
	console.log(this.state.response)
	//this.props.checkPayment().then((whatever) => { console.log('resolved again ')})
  let answer=""
    let length = question.length;
    if((question.indexOf("check") > -1)&& ((question.indexOf("payment") > -1)||(question.indexOf("payments") > -1) )){
			//answer = this.props.payment
			answer=this.state.test
      console.log(answer)
		}
		else if((question.indexOf("check") > -1)&& (question.indexOf("contract") > -1 ) ){
			console.log('contract')
			//answer = this.props.payment
			answer=this.props.period
      console.log(answer)
		}
		else if((question.indexOf("hello") > -1)|| (question.indexOf("hi") > -1 ) ){
			//answer = this.props.payment
			answer="Hello , how can i help you ?"
      console.log(answer)
		}
		else if((question.indexOf("earn") > -1)&& (question.indexOf("insurance") > -1 ) ){
			//answer = this.props.payment
			answer=this.props.speech
      console.log(answer)
		}
		else if((question.indexOf("thanks") > -1)|| (question.indexOf("thank you") > -1 )||(question.indexOf("thank for your help") > -1 ) ){
			//answer = this.props.payment
			answer="Anytime my friend"
      console.log(answer)
		}
		
    else {
      answer = "Sorry ! what do you mean?";

    }
    return answer;
}


toggleListen() {
	this.setState({
		listening: !this.state.listening,
	}, this.handleListen)
}


button = () => {
	navigator.mediaDevices.getUserMedia({audio:true}).then((localStream)=>{
		var audioContext = new(window.AudioContext || window.webkitAudioContext)();
		var input = audioContext.createMediaStreamSource(localStream);
		var analyser = audioContext.createAnalyser();
		var scriptProcessor = audioContext.createScriptProcessor();
		// Some analyser setup
		analyser.smoothingTimeConstant = 0;
		analyser.fftSize = 64;
	
		input.connect(analyser);
		analyser.connect(scriptProcessor);
		scriptProcessor.connect(audioContext.destination);
		var getAverageVolume  =  function( array){
				var length = array.length;
				var values = 0;
				var i = 0;
			 for (; i < length; i++) {
					values += array[i];
			 }
			return values / length;
		};
		var onAudio = () => {
			var tempArray = new window.Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(tempArray);
		  latestFrequency = (getAverageVolume(tempArray));
			//use latestFrequency
			if(latestFrequency<40){
				console.log(latestFrequency+" SILENCEEEE")
			}
			else{
				console.log(latestFrequency+" you're talking")
			}
			cmpt ++;
			if (latestFrequency > 70) {
				score += 5;
			}
			else if ((latestFrequency < 70) && (latestFrequency > 50)){
				score += 3;
			}
			else if ((latestFrequency < 50) && (latestFrequency > 30)) {
				score += 0;
			}
			else if ((latestFrequency < 30) && (latestFrequency > 11)){
				score -=3;
			}
			else if (latestFrequency < 11){
				score-=5;
			}
			if(cmpt > 10) {
				cmpt = 0;
				score = 0;
			}

		};
		scriptProcessor.onaudioprocess = onAudio;
	})
	.catch(function(){
		//Handle error
	});
}



handleListen() {
	if (this.state.listening) {
		console.log(this.state.listening)
		this.button();
		//console.log(latestFrequency)
		recognition.start()
		recognition.onend = () => {
		
			console.log("...continue listening...")
			recognition.start()
			this.setState({
				listen:true
			})
		}

	} else {
		recognition.stop()
		recognition.onend = () => {
				console.log(document.getElementById('final').value)
			console.log("Stopped listening per click")
			this.setState({
				listen:false
			})
		}
	}

	recognition.onstart = () => {
		console.log("Listening!")
	}

	recognition.onaudioend  =()=>{
		//socket.emit('hellomessage', "hello world");
		console.log("onTimeout")
				recognition.onend = () => {
					//console.log(document.getElementById('final').value)
				console.log("Stopped ")
				this.addNewMessage()
			};
	
		

	}
	

	let finalTranscript = ''
	recognition.onresult = event => {
		let interimTranscript = ''

		for (let i = event.resultIndex; i < event.results.length; i++) {
			const transcript = event.results[i][0].transcript;
			if (event.results[i].isFinal)
			{
				finalTranscript += transcript + ' ';
				document.getElementById('text').value = finalTranscript
				console.log(finalTranscript)
			} 
			else interimTranscript += transcript;
		}

		//document.getElementById('interim').innerHTML = interimTranscript
	//-------------------------COMMANDS------------------------------------

		const transcriptArr = finalTranscript.split(' ')
		const stopCmd = transcriptArr.slice(-3, -1)
		console.log('stopCmd', stopCmd)

		if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
			recognition.stop()
			recognition.onend = () => {
				console.log('Stopped listening per command')
				const finalText = transcriptArr.slice(0, -3).join(' ')
				document.getElementById('text').value = finalText
				console.log(finalText)
			}
		}
	}
	
//-----------------------------------------------------------------------
	
	recognition.onerror = event => {
		console.log("Error occurred in recognition: " + event.error)
	}

}

render() {
	let start = (this.state.time == 0)
    return (
			<div>
				<p onClick={this.synthesize}>Call</p>
			</div>
		);
}
}

export default SpeechComponent

