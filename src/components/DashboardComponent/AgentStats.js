import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners';
import {getBotEvolution,getWrongAnswers} from '../DashboardComponent/api';
import {Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

export default class AgentStats extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      loading: true, 
      evolutionData:[],
      wrongAnswers:[],
      newBotLabel:[],
      newBotData:[] ,
      chartData:{},
      keyValue:[],
      dataValue:[]
    }
   


  }
  componentDidMount()
  {
    
    getWrongAnswers((err, resultat) => {this.setState({ 
      wrongAnswers:resultat
       },function(){
        var newArray=[];
        var newDataArray=[];
        var i;
        for (i = 0; i < this.state.wrongAnswers.length; i++)
         { 
          var keys = Object.keys(this.state.wrongAnswers[i]);
          for(var j=0; j<keys.length; j++)
          {
            var key = keys[j];
              
            newArray=[...newArray,key];
              
            newDataArray=[...newDataArray,this.state.wrongAnswers[i][key]];
           }
        }
        this.setState({keyValue:newArray});
        this.setState({dataValue:newDataArray});
       
       })
      }
    );
    getBotEvolution((err, resultat) => {this.setState({ 
      evolutionData:resultat
       },function(){  
        var newArray=[];
        var newDataArray=[];

       var keys = Object.keys(this.state.evolutionData[0]);
       for(var i=0; i<keys.length; i++)
       {
           var key = keys[i];

            newArray=[...newArray,key];
              
            newDataArray=[...newDataArray,this.state.evolutionData[0][key]*10];
        }
        function shuffle(arra1) {
          var ctr = arra1.length, temp, index;
      
      // While there are elements in the array
          while (ctr > 0) {
      // Pick a random index
              index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
              ctr--;
      // And swap the last element with it
              temp = arra1[ctr];
              arra1[ctr] = arra1[index];
              arra1[index] = temp;
          }
          return arra1;
      }
      var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var mynewArray=[];
    // shuffle(newDataArray);
     // console.log(mynewArray);

        this.setState({newBotLabel:newArray});
        this.setState({newBotData:newDataArray});
     //   console.log(this.state.newBotData);

        this.setState({
          chartData:{
          
            labels:this.state.newBotLabel,
            datasets:[
              {
                label:'',
                data:this.state.newBotData,
                backgroundColor:[         
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
       
       
       })
      }
    );
  }
  render() {
   
    
    if(typeof this.state.evolutionData[0] !== 'undefined')
    {
      const wrongAnswers=this.state.keyValue.map((value)=>{return(
        <td>{value}</td>
      )
      })
      const askedQuestions=this.state.dataValue.map((value)=>{
        return(
        <td>{value}</td>
        )
      })

      return (

        <React.Fragment>
         
           <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Evolution of the bot',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

          <div >
                        <table><th>Wrong Answers</th><tr>{wrongAnswers}</tr></table>
                        <table><th>Asked Questions</th><tr>{askedQuestions} </tr></table>
                    </div>
        
        </React.Fragment>
      )
    }
    return (
     
      <React.Fragment >
        <div style={{marginLeft:'400px',marginTop:'180px'}}>
      <ClipLoader
        marginLeft={'150px'}
        sizeUnit={"px"}
        size={250}  
        color={'#123abc'}
        loading={this.state.loading}
      />
   </div>
  </React.Fragment>
      
    )
  }
}
