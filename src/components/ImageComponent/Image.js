import React, { Component } from 'react'
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import UploadImage from '../UploadImagesComponent/UploadImage';


export default class Image extends Component {

    state = 
    {       
          stateFile : null, 
          nameFile : "" ,
          text : null, 
          data : { 
                num: '',
                nom: '',
                prenom: '',
                dateNaissance: '',
                adresse: '' 
        },
        uploadImage: false
    }

    handleFile(e){
        
        var file = e.target.files[0];
        
        this.setState({ stateFile : file,
                        nameFile :file.name,
        },function()
        {
           console.log(this.state.stateFile);
              
        });          
    }

    

    handleUpload(e){
        
        const config = {
            onUploadProgress: progressEvent => console.log("upload progresse"+Math.round(progressEvent.loaded/progressEvent.total*100)+" %"),
            headers: { 'content-type': 'multipart/form-data' }
        };

        var file = this.state.stateFile;
        let formdata = new FormData();
        formdata.append('image',file);
        formdata.append('name',file.name);

        Axios.post('http://localhost:3000/image',formdata,config).then(res => {
            console.log(res);
            this.setState({
                data : { 
                    num: res.data.num,
                    nom: res.data.nom,
                    prenom: res.data.prenom,
                    dateNaissance: res.data.dateNaissance,
                    adresse: res.data.adresse 
            }
            })
            this.props.addMsgAnswer("Hello "+this.state.data.nom+" "+this.state.data.prenom); 
            this.props.callUpload(this.state.data.nom+" "+this.state.data.prenom); 
        }).catch(err => console.log(err))
       
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
                        <input id="file-input" type="file" name="file" onChange={(e)=>this.handleFile(e)}></input>
                    </div>
                        <p onClick={(e)=> {this.handleUpload(e)}}> Upload</p>
                    </div>    
            </div> 
            <br/>
            </form>
        </React.Fragment>
    )
  }
}
