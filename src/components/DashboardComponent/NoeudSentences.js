import React, { Component } from 'react'

export default class NoeudSentences extends Component {
  render() {
    return this.props.selectedNoeud.sentenses.map(
        (sentence) => (
                <tr>
                    <td>{sentence}</td>
                </tr>
        )
    ); 
  }
}
