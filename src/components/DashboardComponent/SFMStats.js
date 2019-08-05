import React, { Component } from 'react'
import { getAllInsuranceContracts } from '../DashboardComponent/api';
import {mostPurchasedInsurances} from '../DashboardComponent/api';
import {getAllCoverages} from '../DashboardComponent/api';
import {getFilteredClaims} from '../DashboardComponent/api';
import {getAccidentsByAge,getAccidentsByGender} from '../DashboardComponent/api';
import { css } from '@emotion/core';
import MUIDataTable from "mui-datatables";
import { ClipLoader } from 'react-spinners';
import {Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
const columns = ["insuranceHolderName", "insuranceType", "insurancePrice", "insuranceCoverages"];
const columns1 =["claimHolder","claimDate","claimProgress","claimHolderPhone"];

const options = {
  selectableRows: false
};

const override = css`
    display: block;
    marginLeft:50px;
    border-color: red;
`;

export default class SFMStats extends Component {

  constructor(props){
    super(props);
    this.state={
      listeInsuranceContracts:[], 
      mostPurchasedInsurances:[],
      listCoverages:[],
      newArray:[],
      elem:[],
      dataSet:[],
      loading: true,
      chartData:{},
      newChartData:{},
      newGenderChartData:{},
      newAgeChartData:{},
      newLabel:[],
      newData:[],
      newLabels:[],
      newDatas:[],
      listClaims:[],
      listAccidentByGender:[],
      listAccidentByAge:[],
      newGenderLabel:[],
      newGenderData:[]
    }
   
  }

  
  componentDidMount() 
  {
    
    mostPurchasedInsurances((err, resultat) => {this.setState({ 
      mostPurchasedInsurances:resultat
       },function(){
       //  console.log(this.state.mostPurchasedInsurances[0]);
        var newArray=[];
        var newDataArray=[];
 
        var keys = Object.keys(this.state.mostPurchasedInsurances[0]);
      for(var i=0; i<keys.length; i++){
       var key = keys[i];
       //     console.log(key, this.state.mostPurchasedInsurances[0][key]);

            newArray=[...newArray,key];
              
            newDataArray=[...newDataArray,this.state.mostPurchasedInsurances[0][key]*10];
        }

        this.setState({newLabels:newArray});
        this.setState({newDatas:newDataArray});

        this.setState({
          newChartData:{
          
            labels:this.state.newLabels,
            datasets:[
              {
                label:'Percentage of purchased insurances',
                data:this.state.newDatas,
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
    getFilteredClaims((err, resultat) => {this.setState({ 
      listClaims:resultat
       },)
      }
    );



    getAccidentsByAge((err, resultat) => {this.setState({ 
      listAccidentByAge:resultat
       },)
      }
    );

    getAccidentsByGender((err, resultat) => {this.setState({ 
      listAccidentByGender:resultat
       },function(){
        var newArray=[];
        var newDataArray=[];
  //  console.log(this.state.listAccidentByGender[0]);
        var keys = Object.keys(this.state.listAccidentByGender[0]);
      for(var i=0; i<keys.length; i++)
      {
           var key = keys[i];
       
            newArray=[...newArray,key];
              
            newDataArray=[...newDataArray,this.state.listAccidentByGender[0][key]*10];
        }

        //console.log(newDataArray);
        this.setState({newGenderLabel:newArray});
        this.setState({newGenderData:newDataArray});

        this.setState({
          newGenderChartData:{
          
            labels:this.state.newGenderLabel,
            datasets:[
              {
                label:'Accidents by Gender',
                data:this.state.newGenderData,
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





    getAllInsuranceContracts((err, resultat) => {this.setState({ 
      listeInsuranceContracts:resultat
       },function(){})
      }
    );
     
    getAllCoverages((err, resultat) => {this.setState({ 
      listCoverages:resultat
       },function(){
         var newArray=[];
         var newDataArray=[];
     
        for (var i = 0; i <this.state.listCoverages[0].length; i++) { 
         
        newArray=[...newArray,this.state.listCoverages[0][i].label];
              
        newDataArray=[...newDataArray,this.state.listCoverages[0][i].y];
        }
    
        this.setState({newLabel:newArray});
        this.setState({newData:newDataArray});

        this.setState({
          chartData:{
          
            labels:this.state.newLabel,
            datasets:[
              {
                
                data:this.state.newData,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
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

      static defaultProps = 
      {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
      }


     
    
  


  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
 
 
if(typeof this.state.listCoverages[0] !== 'undefined')
{
  
  //console.log(this.state.mostPurchasedInsurances);
  // <table  className="display" width="100%" data={} ref={el => (this.el = el)}/>
  /*<RadarChart  cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.listCoverages[0]}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={90} domain={[0, 8]} />
  <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
  <Legend />
</RadarChart>*/

  return (
  <React.Fragment>
   
   <MUIDataTable
   options={options}
  title={"Contract List"}
  data={this.state.listeInsuranceContracts}
  columns={columns}
  />
      <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Most Chosen Insurance Coverages',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <Bar
          data={this.state.newChartData}
        

          options={{
           
            title:{
              display:this.props.displayTitle,
              text:'Most Purchased Insurances',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:'bottom'
            }
          }}
        />

<MUIDataTable
   options={options}
  title={"Claim List"}
  data={this.state.listClaims}
  columns={columns1}
  />
      

      <Doughnut 
          data={this.state.newGenderChartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Accidents by Gender',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:'bottom'
            }
          }}
        />
      
   
      
      </React.Fragment>
    );
}

return (
  <React.Fragment >
         <div style={{marginLeft:'400px',marginTop:'180px'}}>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={250}
          
          color={'#123abc'}
          loading={this.state.loading}
        />
     </div>
    </React.Fragment>
  );
  }
}
