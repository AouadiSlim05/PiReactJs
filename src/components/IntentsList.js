import React, { Component } from 'react'

export default class IntentsList extends Component {
  render() {
    return this.props.intents.map(
        (intent) => (
            <div class="IntentCard" onClick={this.props.selectIntent.bind(this, intent)}>
                    <i class="fas fa-lightbulb"></i>
                    <p>#{intent.intentTitle} </p>
                    <i class="fas fa-ellipsis-v"></i>
            </div>
        )
    ); 
  }
}
