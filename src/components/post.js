import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchPosts} from '../store/actions/postActions';

class post extends Component {
  
  componentWillMount(){
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.posts.unshift(nextProps.newPost);
    }
  }
  render() {
      const postItems=this.props.posts.map(post=>(
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
      ));
    return (
      <div>
        <h1>Post</h1>
        {postItems}
      </div>
    )
  }
}



const mapStateToProps=state=>({
  posts:state.posts.items,
  newPost:state.posts.item
  
})
export default connect(mapStateToProps,{fetchPosts})(post);