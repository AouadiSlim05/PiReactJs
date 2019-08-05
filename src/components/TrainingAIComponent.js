import React, { Component } from 'react'
import axios from 'axios';
import IntentsList from './IntentsList';
import IntentSentences from './IntentSentences';
import shortid from 'shortid';
import NoeudSentences from './DashboardComponent/NoeudSentences';

export default class TrainingAIComponent extends Component {
    state = {
        intents:[
            {
                "intentTitle": "Greetings",
                "sentenses": [
                    "hello",
                    "hi",
                    "hiii",
                    "hey",
                    "what's up"
                ]
            },
            {
                "intentTitle": "Opening",
                "sentenses": [
                    "what's your opening time",
                    "open",
                    "close",
                    "closed",
                    "when",
                    "hours",
                    "working hours",
                    "at which time do you",
                    "At what hour can I swing by?",
                    "Can you tell me how late the stores are open till?",
                    "How early do you open?",
                    "How long are you open?",
                    "How long are you open?",
                    ""
                ]
            },
            {
                "intentTitle": "Anger",
                "sentenses": [
                    "stop",
                    "rude"
                ]
            },
            {
                "intentTitle": "Mood",
                "sentenses": [
                    "how are you doing",
                    "do you do",
                    "and you",
                    "are you",
                    "?"
                ]
            },
            {
                "intentTitle": "Okay",
                "sentenses": [
                    "ok",
                    "cool",
                    "okay",
                    "okay then",
                    "fine",
                    "nice",
                    "ehum",
                    "alright",
                    "alright then",
                    "great",
                    "good to know"
                ]
            },
            {
                "intentTitle": "Thanks",
                "sentenses": [
                    "thanks",
                    "thank you",
                    "I appreciate it",
                    "appreciate",
                    "love",
                    "love it",
                    "love it so much",
                    "Affirmative. That's what I'm looking for",
                    "All right",
                    "great",
                    "got it",
                    "I like that",
                    "sweet",
                    "this is what I was looking for"
                ]
            },
            {
                "intentTitle": "Bye",
                "sentenses": [
                    "bye",
                    "see you",
                    "see you soon",
                    "see you then",
                    "à la prochaine",
                    "leaving"
                ]
            },
            {
                "intentTitle": "Confirmation",
                "sentenses": [
                    "really",
                    "are you serious",
                    "you sure"
                ]
            },
            {
                "intentTitle": "Name",
                "sentenses": [
                    "your name",
                    "your purpose",
                    "tell me about you",
                    "to know more about you",
                    "what's your mission"
                ]
            },
            {
                "intentTitle": "No",
                "sentenses": [
                    "no",
                    "I don't to",
                    "nevermind"
                ]
            },
            {
                "intentTitle": "explanation",
                "sentenses": [
                    "like what",
                    "for example",
                    "can you explain what you can do?",
                    "who are you and what can you do"
                ]
            },
            {
                "intentTitle": "Operation numerique",
                "sentenses": [
                    "calculate",
                    "plus",
                    "minus",
                    "what's the result of this operation",
                    "+",
                    "-",
                    "*"
                ]
            },
            {
                "intentTitle": "Google search",
                "sentenses": [
                    "search",
                    "search for",
                    "search on the internet for",
                    "google",
                    "google for",
                    "google this",
                    "wikepedia",
                    "definition of",
                    "look on the internet for",
                    "look up for",
                    "find",
                    "lookup for"
                ]
            },
            {
                "intentTitle": "Joke",
                "sentenses": [
                    "tell me a joke",
                    "funny",
                    "make me laugh",
                    "haha",
                    "show me your sense of humour"
                ]
            },
            {
                "intentTitle": "smallTalk",
                "sentenses": [
                    "how are you",
                    "are you okay",
                    "and you?"
                ]
            },
            {
                "intentTitle": "login",
                "sentenses": [
                    "login",
                    "authenticate",
                    "access my insurance",
                    "access my profile"
                ]
            },
            {
                "intentTitle": "statusClaim",
                "sentenses": [
                    "check the status of my claim",
                    "check status",
                    "chack status of my insurance claim",
                    "Can you tell me the progress on my case?",
                    "Do my claim proceed further?",
                    "Give me info about my current claim.",
                    "Has a decision been reached?",
                    "Help me to know if there is an update for my claim",
                    "How to check my car accident claim status online?",
                    "I need the money immediately, can they approve it quickly?",
                    "Is it possible to know the progress of my insurance claim?",
                    "I new information about my claim",
                    "I to know if my claim has been rejected.",
                    "The status still in pending for like 3 weeks",
                    "What is the date of approval?",
                    "What is the progress on my claim?",
                    "When do I get my money?",
                    "When my claim is gonna be processed?",
                    "When was the claim approved?",
                    "Where is my money?",
                    "Which information do I need to provide to check my claim's status?",
                    "Which information do I need to provide to check my claim's progress?",
                    "Would it be possible to know claim status over a call?"
                ]
            },
            {
                "intentTitle": "fileClaim",
                "sentenses": [
                    "add a claim",
                    "file a claim",
                    "make a claim",
                    "I to file a claim for my car which got damaged in an accident",
                    "my car got damaged in an accident",
                    "Wanted to know about claim filing",
                    "to know about claim filing",
                    "What is the process to file a claim?",
                    "What should be done to file a claim?"
                ]
            },
            {
                "intentTitle": "register",
                "sentenses": [
                    "I am new",
                    "Can you show me where to register for the program?",
                    "Could you explain how to create a fresh account",
                    "How can I register over here?",
                    "How do I become a customer?",
                    "I'd like to register",
                    "Make account",
                    "Please tell me how to register as one of your members.",
                    "What do I need to do to start an account with you",
                    "What is required to get signed up here?",
                    "What is the log in process for new users?",
                    "What is the process to making an account?",
                    "Where do I register for this?"
                ]
            },
            {
                "intentTitle": "assistanceChoice",
                "sentenses": [
                    "what can you do for me",
                    "what are your options",
                    "I'm hesitant",
                    "I don't know what to ask",
                    "I don't know how"
                ]
            },
            {
                "intentTitle": "payementStatus",
                "sentenses": [
                    "I to see my payement status",
                    "I to see my paiement status",
                    "I to check my payements",
                    "I to see when my payements are due",
                    "I to ask about my payement",
                    "I to ask about my paiement",
                    "when do you need me to pay for your services?",
                    "when do I pay"
                ]
            },
            {
                "intentTitle": "pay",
                "sentenses": [
                    "I'm going to pay",
                    "I want to pay for the insurance",
                    "I want to pay for the service",
                    "Can you help me transfer the money to your service",
                    "how can I transfer funds electronically",
                    "Could you please assist me with transferring funds?",
                    "Transfer money to insurance",
                    "Can I do a bill payment?",
                    "Can I pay my bill?",
                    "Can you assist me with paying my bill?",
                    "I'd like to pay",
                    "I think I'm gonna pay the bill",
                    "I need to pay the cost of my service plan",
                    "Want to pay",
                    "Do you accept paypal?"
                ]
            },
            {
                "intentTitle": "policyInquiry",
                "sentenses": [
                    "I want to have a policy estimation",
                    "I want to estimate my insurance policy with you",
                    "What is the cost of my car coverage",
                    "Am I covered for a car accident and how much?",
                    "what is the cost of a car accident coverage"
                ]
            },
            {
                "intentTitle": "cancel",
                "sentenses": [
                    "cancel",
                    "exit",
                    "backup",
                    "back up",
                    "go back one step",
                    "I changed my mind",
                    "nevermind"
                ]
            },
            {
                "intentTitle": "prediction",
                "sentenses": [
                    "What can you suggest to me as a type of insurance",
                    "Can you help me pick an insurance type?",
                    "Can you help me go through the process of picking an insurance type",
                    "What's the best insurance deal you got for me",
                    "How can I pick the best insurance type for my situation"
                ]
            },
            {
                "intentTitle": "subscribe",
                "sentenses": [
                    "subscribe to the option",
                    "confirm my subscription",
                    "can I have that?"
                ]
            },
            {
                "intentTitle": "scoreAnalysis",
                "sentenses": [
                    "score analysis",
                    "mood"
                ]
            },
            {
                "intentTitle": "call",
                "sentenses": [
                    "call",
                    "audio",
                    "calling",
                    "sound",
                    "let's make a call"
                ]
            }
        ],
        noeuds: [{"intentTitle":"Greetings","sentenses":["Hi! What can I do for you?","Hello sir","Hey man!"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Anger","sentenses":[""],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Opening","sentenses":["we work from 6am to 9pm","we are closed now","every day"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"smallTalk","sentenses":["I am fine thank you","How are YOU doing","fine fine","fine and you?"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Okay","sentenses":["okay then","yeah...","alright","okaay"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Thanks","sentenses":["no thanks","my pleasure",":)","glad I could help"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Bye","sentenses":["bye then","okay bye","see you...","asta la vista","I had a nice time talking with you","okay get out of my face now"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Confirmation","sentenses":["yes really","yes","dead serious","I'm sure at 100%","trust me baby"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Name","sentenses":["my name is Lambda and I am an AI agent for your insurance customer srvice","my name is Lambda and I was created to satisfy the insurance customer's needs","my name is Lambda and I am here to help you"],"options":["ask me about your insurance plans","file an insurance claim","see your insurance history","search on the internet through me","discover many other things that I can do.."],"pause":5,"functions":[],"parametresOptions":[]},{"intentTitle":"No","sentenses":["okay, chill","okay nevermind","wadha7","mriguel"],"options":[],"pause":null,"image":null,"childNoeud":{"intentTitle":"Opening","sentenses":["we work from 6am to 9pm","we are closed now","every day"],"options":[],"functions":[],"parametresOptions":[]},"functions":[],"parametresOptions":[]},{"intentTitle":"explanation","sentenses":["like anything you want","you can ask about any of our insurance services"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Operation numerique","sentenses":["The result of your operation is: ","If my calculations are correct the result is: ","My math is poor but even I can do this one :p "],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Google search","sentenses":[""],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"Joke","sentenses":["Q. How does a computer get drunk?","Q. Why did the PowerPoint Presentation cross the road?"],"options":[],"pause":3,"image":null,"childNoeud":{"intentTitle":"#","sentenses":["A. It takes screenshots.","A. To get to the other slide."],"options":[],"pause":3,"image":null,"childNoeud":{"intentTitle":"Emojis","sentenses":[":)",":p",":D"],"options":[],"functions":[],"parametresOptions":[]},"functions":[],"parametresOptions":[]},"functions":[],"parametresOptions":[]},{"intentTitle":"Emojis","sentenses":[":)",":p",":D"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"login","sentenses":["Welcome back to our services."],"options":[],"pause":1,"image":null,"childNoeud":{"intentTitle":"loginChild","sentenses":["I'll need these info from you, to get you authenticated"],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["checkLogin"],"parametresOptions":["your name","your password"]},"functions":["answer"],"parametresOptions":[]},{"intentTitle":"statusClaim","sentenses":["your claim status is: in progress. Please be patient while our experts study your file"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"fileClaim","sentenses":["Let's add a new claim for you"],"options":[],"pause":null,"image":null,"childNoeud":{"intentTitle":"fileClaimChild","sentenses":["Let's start with your accident's informations. I will need you to give me these details first: "],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["fileClaimChild"],"parametresOptions":["When did the accident happen (exact date)?","Where did it happen (street address)?","What was your direction?","What was the other driver's direction?","Please give me a description of what happened","How were the driving condtions?","How was the weather and visibility?","Were there any witnesses?","What's his/her name and contact info","Were there any police officers?","What's their names and badge numbers?"]},"functions":["fileClaim"],"parametresOptions":[]},{"intentTitle":"register","sentenses":["Okay let's get you registred","Welcome on board","We are glad you can join us, let's sign you up"],"options":[],"functions":[],"parametresOptions":[]},{"intentTitle":"assistanceChoice","sentenses":["Well, you can:"],"options":["ask me about your insurance plans","file an insurance claim","see your insurance history","search on the internet through me","discover many other things that I can do.."],"functions":[],"parametresOptions":[]},{"intentTitle":"payementStatus","sentenses":["Okay let's see your payement status","Okay, let me check your payement status","Okay, let me look up for your payement status"],"options":[],"pause":3,"image":null,"childNoeud":null,"functions":["getClientPayement"],"parametresOptions":[]},{"intentTitle":"pay","sentenses":["Very good, let me open a paypal window for you","You can pay with paypal. Let me open a new window for you"],"options":["pay for 6 months","pay for the year"],"pause":3,"image":null,"childNoeud":{"intentTitle":"payChild","sentenses":["choose carefully","choose your payement duration"],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["chooseOptionPayment"],"parametresOptions":[]},"functions":["answer"],"parametresOptions":[]},{"intentTitle":"policyInquiry","sentenses":["Our policy costs depend on your information","I am going to ask you some info to estimate your policy costs"],"options":[],"pause":null,"image":null,"childNoeud":{"intentTitle":"policyInquiryChild","sentenses":["Let's start with info about you. I will need you to give me these details first: "],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["policyInquiryChild"],"parametresOptions":["What's your car's constructor","Nice. What's your car's model","What's your car's power","Wow. What's your car's energy type","What's your car's construction date","What's the number of Kilometers?"]},"functions":["answer"],"parametresOptions":[]},{"intentTitle":"prediction","sentenses":["I will try my best to find the most suitable insurance type for you","Okay, sure, we'll just need to get some info from you","It depends on your needs. We'll need to get some info from you"],"options":[],"pause":null,"image":null,"childNoeud":{"intentTitle":"predictionChild","sentenses":["Are you: "],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["prediction1"],"parametresOptions":["male","female"]},"functions":["answer"],"parametresOptions":[]},{"intentTitle":"subscribe","sentenses":["Great. Good choice","Very well. I'll be subscribing you","Your subscription to this insurance type is in progress..."],"options":[],"pause":3,"image":null,"childNoeud":null,"functions":["subscribe"],"parametresOptions":[]},{"intentTitle":"subscribe","sentenses":["From analysis of this conversation:"],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["mood"],"parametresOptions":[]},{"intentTitle":"cancel","sentenses":["Okay, let's cancel this","Okay I'm stopping this process"],"options":[],"pause":null,"image":null,"childNoeud":null,"functions":["cancel"],"parametresOptions":[]},{"intentTitle":"call","sentenses":["Very good, let us have a call","I am going to call you"],"options":[],"pause":0,"image":null,"childNoeud":null,"functions":[],"parametresOptions":[]}],
        selectedIntent:{
            id: "",
            intentTitle: "",
            sentenses: [
            ]
        }, 
        selectedNoeud: {
            id: "",
            intentTitle: "",
            sentenses: [
            ]
        },
        actionBtn: "Add Intent",
        actionInput: "Add Sentence",
        sentence: ""
    }

    componentDidMount = () =>
    {
        this.listIntents();
        this.listNoeuds();
        this.setState({
            intents: this.state.intents.map((intent) => {
                const newIntent = {
                    id: shortid.generate(),
                    intentTitle: intent.intentTitle,
                    sentenses: intent.sentenses
                }
                return newIntent
            }),
            noeuds: this.state.noeuds.map((noeud) => {
                const newNoeud = {
                    id: shortid.generate(),
                    intentTitle: noeud.intentTitle,
                    sentenses: noeud.sentenses
                }
                return newNoeud
            })
        });
        
    }

    listIntents = () => {
        axios.get('http://localhost:3000/api/claim/listIntents')
        .then(res => this.setState({
            intents: res.data
        }));
    }

    listNoeuds = () => {
        axios.get('http://localhost:3000/api/claim/listNoeuds')
        .then(res => this.setState({
            noeuds: res.data
        }));
    }

    selectIntent = (intent, event) =>
    {
        var element = event.currentTarget; 
        if (document.getElementsByClassName("IntentCardSelected")[0]) {
            document.getElementsByClassName("IntentCardSelected")[0].className = "IntentCard";
        }

        element.className = "IntentCardSelected";
        this.setState({
            selectedIntent: intent
        });

        for (let index = 0; index < this.state.noeuds.length; index++) {
            if(this.state.noeuds[index].intentTitle === intent.intentTitle) {
                console.log(this.state.noeuds[index])
                this.setState({
                    selectedNoeud: this.state.noeuds[index]
                });
                break;
            }
            else {
                this.setState({
                    selectedNoeud: {
                        id: "",
                        intentTitle: "",
                        sentenses: [
                        ]
                    }
                });
            }
        }


        
    }

    addIntentBody = () => {
        if(this.state.actionBtn == "Add Intent") {
            const newIntent = {
                "id": shortid.generate(),
                "intentTitle": "",
                "sentenses": [
                ]
            }
            this.setState({
                intents: [...this.state.intents, newIntent],
                actionBtn: "Save Intent"
            });
        }
        else {
            this.saveIntent();
            
        }
    }

    writetIitle = (e) => {
        this.setState({
            selectedIntent: {
                id: this.state.selectedIntent.id,
                intentTitle: e.target.value,
                sentenses: this.state.selectedIntent.sentenses
            }
        }); 
        const id = this.state.selectedIntent.id;
        this.setState({
            intents: this.state.intents.map((intent) => {
                if (intent.id === id) {
                    intent.intentTitle = e.target.value;
                }
                return intent
            })
        })
    }

    saveIntent = () => {
        console.log(this.state.intents[this.state.intents.length - 1]);
        const newIntent = this.state.selectedIntent;
        const newNoeud = {
            intentTitle: this.state.selectedIntent.intentTitle, 
            sentenses: this.state.selectedNoeud.sentenses
        }
      
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/claim/newIntent',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/json'
            },
            data: {
                newIntent
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
        });
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/claim/newNoeud',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/json'
            },
            data: {
                newNoeud
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
        });
        
        this.setState({
            actionBtn: "Add Intent"
        });
    }

    writeSentence = (e) => {
        this.setState({
            sentence: e.target.value
        });

    }

    addSetntence = () => {
        if(this.state.actionInput == "Add Sentence") {
            this.setState({
                selectedIntent: {
                    id: this.state.selectedIntent.id,
                    intentTitle: this.state.selectedIntent.intentTitle,
                    sentenses: [...this.state.selectedIntent.sentenses, this.state.sentence]
                }
            }); 
            const id = this.state.selectedIntent.id;
            this.setState({
                intents: this.state.intents.map((intent) => {
                    if (intent.id === id) {
                        intent.sentenses = [...intent.sentenses,this.state.sentence];
                    }
                    return intent
                })
            })
        }
        else {
            this.setState({
                selectedNoeud: {
                    id: this.state.selectedNoeud.id,
                    intentTitle: this.state.selectedNoeud.intentTitle,
                    sentenses: [...this.state.selectedNoeud.sentenses, this.state.sentence]
                }
            }); 

            const id = this.state.selectedNoeud.id;
            this.setState({
                noeuds: this.state.noeuds.map((intent) => {
                    if (intent.id === id) {
                        intent.sentenses = [...this.state.selectedNoeud.sentenses, this.state.sentence];
                        
                    }
                    return intent
                })
            })

        }
        this.setState({sentence:''})
    }

    changeInput = (param) => {
        if(param == "Add Sentence") {
            this.setState({actionInput: "Add Sentence"})
        }
        else {
            this.setState({actionInput: "Add Dialogue"})
        }
    }

  render() {
    return (
        <div class="mainContent2">
            <div class="contentHeadTrain">
                <div class="titleIntent">
                    <h3>#INTENTS</h3>
                    <h4>Your Intents List:</h4>
                </div>
                <p>Show conflicts</p>
            </div>

            <div class="sideBarIntents">
                <IntentsList intents={this.state.intents} selectIntent={this.selectIntent}/>
                <button className="btnMore" onClick={this.addIntentBody}><i className="fas fa-plus" id="plus"></i>{this.state.actionBtn}</button>

            </div>

            <div class="IntentMenu">
                <div class="intentTitleDiv">
                    <i class="fas fa-hashtag"></i>
                    <h3 class="intentTitleMenu">INTENT TITLE: </h3>
                    <input type="text" className="intentTitleInput" onChange={this.writetIitle} value={this.state.selectedIntent.intentTitle}/>
                </div>
                <div class="IntentMenuContent">
                <div className='flexDiv'>
                        <h4 className="sentensesTitle" onClick={this.changeInput.bind(this, "Add Sentence")}><i class="fas fa-comment-dots" ></i><b>SENTENCES:</b></h4>
                        <h4 className="sentensesTitle" id="sentensesTitle" onClick={this.changeInput.bind(this, "Add Dialogue")}><i class="fas fa-comments"></i><b>DIALOGUE:</b></h4>
        
                    </div>
                    <div className='flexDiv'>
                        <table><IntentSentences selectIntent={this.state.selectedIntent}/></table>
                        <table><NoeudSentences selectedNoeud={this.state.selectedNoeud}/></table>
                    </div>
                    
                </div>
                <div className="footerContent">
                    <i className="fas fa-angle-right" id="sendAttachIcon"></i>
                    <input type="text" id="inputMsg" className="msgInput" placeholder={this.state.actionInput} style={{marginTop: '32px'}} onChange={this.writeSentence} value={this.state.sentence}/>
                    <i className="far fa-paper-plane" id="sendIcon" onClick={this.addSetntence}></i>
                    <i className="fas fa-paperclip"  id="sendIcon"></i>
                </div>
            </div>
            
        </div>
    )
  }
}
