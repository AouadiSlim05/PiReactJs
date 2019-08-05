import React, { Component } from 'react'

export default class DiscussionList extends Component {
  render() {
    return this.props.discussions.map(
        (discussion) => (
            <div className="discussion" onClick={this.props.selectDiscuss.bind(this, discussion)}>
                    <img src={discussion.img} className="userImg"/>
                    <div className="textDiscussion">
                        <p className="timeMessage" style={{float: 'right'}}>18 Feb</p>
                        <p className="contact">{discussion.nameDiscuss}</p>
                        <p className="message">{discussion.lastMsg.length < 50 ? discussion.lastMsg : discussion.lastMsg.substring(0, 80) + '...'}</p>
                    </div>
             </div>
        )
    ); 
  }
}
