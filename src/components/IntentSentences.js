import React, { Component } from 'react'

export default class IntentSentences extends Component {
  render() {
    return this.props.selectIntent.sentenses.map(
        (sentence) => (
            
                <tr>
                    <td>{sentence}</td>
                </tr>
            
        )
    ); 
  }
}
