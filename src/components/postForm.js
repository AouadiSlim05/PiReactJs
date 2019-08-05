import React, { Component } from 'react'
import {connect } from 'react-redux';
import {createPost } from'../store/actions/postActions';

class postForm extends Component {
    constructor(props)
    {
        super(props);
        this.state={
          title:'',
          body:'', 
          eleves:[
            {
              nom:'fedi'
            },
            {
              nom:'slim'
            }
          ]
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange = (event) => {
      this.setState({
        [event.target.name]:event.target.value
      });
    }

    onSubmit(event){
      event.preventDefault();
      const post={
        title:this.state.title,
        body:this.state.body
      }
    this.props.createPost(post);
       
    }
  render() {
    return (
      <div>
          <h1>Add Post</h1>
          <form  onSubmit={this.onSubmit}>
           <div>
            <label> Title : </label><br/>
            <input name="title" type="text" onChange={this.onChange} value={this.state.title}/>


           </div>
           <div>
            <label> Body : </label><br/>
            <textarea name="body"  onChange={this.onChange}  value={this.state.body} />


           </div>
           <br/>
           <button type="submit">Submit</button>
          </form>
      </div>
    )
  }
}

export default connect(null,{createPost})(postForm);

