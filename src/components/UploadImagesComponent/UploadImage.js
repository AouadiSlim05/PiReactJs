import React, { Component } from 'react'
import { Button,ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import Dashboard from '../DashboardComponent/dashboardComponent';





export default class UploadImage extends Component {
    state = 
    {
         images : { 
                    image1: '/farouk1.JPG', 
                    image2: '/farouk1.JPG',
                    image3 : '/farouk1.JPG'
                  },
          username : '',        
          stateFiles : [],   

    } 


    addImages(){
        const images = {
            image1 : this.state.images.image1,
            image2 : this.state.images.image2,
            image3 : this.state.images.image3,
            username : this.props.userName
            }

        Axios.post('http://localhost:3000/face/train',{images}).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    handleFile(e){
        this.changeName(); 
        var files = e.target.files;
        
        this.setState({ stateFiles : files
        },function()
        {
           console.log(this.state.stateFiles);
        });

        this.setState({images : { 
                                     image1: files[0].name, 
                                     image2: files[1].name,
                                     image3 : files[2].name
                                }
                       },function()
                       {
                          console.log(this.state.images.image1);
                       });              
    }


    changeName(){
        
        //var name = e.target.value;  
        var name = this.props.userName; 
        this.setState({ username : name})      
    }

    handleUpload(e){
        

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        var files = this.state.stateFiles;

        Array.prototype.forEach.call(files, e => {
            let formdata = new FormData();
            formdata.append('image',e);

            Axios.post('http://localhost:3000/face',formdata,config).then((res)=> { 
                console.log(res);
                console.log(res.data);
            })
          });
    }



  render() {
    
      
    return (
        
        <React.Fragment>
        <form>
         <div className='messageElement'>
                <div className="inline">  
                    
                    <div class="image-upload">
                        <label for="file-input">
                            <i class="fas fa-paperclip" id="iconUpload"></i>
                        </label>
                         <input id="file-input" type="file" name="file" multiple onChange={(e)=>this.handleFile(e)}></input>
                    </div>
                    <p onClick={(e)=> { this.handleUpload(e) }}> Upload </p>
                    <p onClick={ (e)=>{ this.addImages() }}> | add Images </p>
                
                </div>
        </div> 
        
        </form>
        
        </React.Fragment>
        
    )
  }
}
