import React, { Component } from 'react'
import Webcam from "react-webcam";
import Axios from 'axios';
export default class WebcamCapture extends Component {

    state = {
        imageData : null,
        imageName : "",
        saveImage : false,
        userName : "",
        user : {
          name: "",
          lastname:"",
          email:"",
        }
    }


    setRef = webcam => {
        this.webcam = webcam;
      };
     
      capture = (e) => {
        e.preventDefault();
        const imageSrc = this.webcam.getScreenshot();
        this.setState({imageData : imageSrc },function()
        {
           console.log(this.state.imageData);
        });

        Axios.get('http://localhost:3000/cam').then(res => {
            console.log(res);
            console.log(res.data);
        }); 

        this.predict(e); 

      };

      onChangeUser=(e)=>{
        this.props.changeUser(this.state.user);
      }      

      predict = (e) => { //<button className="btnMoreWebcam" onClick={(e)=>this.predict(e)}>predict photo</button>
        e.preventDefault();
        this.props.predictUser("FediBn"); 
        Axios.get('http://localhost:3000/face/predict').then(res => {
           // console.log(res);
            this.setState({userName : res.data.className },function()
             {
                console.log("username : "+this.state.userName);
            });

            Axios.get('http://localhost:3000/users/'+this.state.userName).then(res => {
              
              console.log(res.data);
              this.setState({
                user : {
                  name: res.data.nom,
                  lastname: res.data.prenom,
                  email: res.data.email,
                }
               },function()
             {
                console.log("user objet : "+this.state.user.name);
                this.onChangeUser(e);
                
            });
          })
          

        })


      };

      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user"
        };
     
        return (
          <form>
            <div className="webcam">
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width="99%"
                height="100%"
                videoConstraints={videoConstraints}
              />

              <div className="buttonsWebcam">
                 <img src="./img/capture.png" onClick={(e)=>this.capture(e)}  className="capture" />
              </div>
              
            </div>
              
          <div>
          </div>
          </form>
        );
      }
}
