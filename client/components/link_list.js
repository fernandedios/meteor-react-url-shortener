import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';
import config from './config/config.js';

class LinkList extends Component {
  renderRows() {
    return this.props.links.map(link => {

      const { url, clicks, token } = link; 

      // using es6 template string
      const shortLink = `${config.domain}/${token}`;

      return(
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>
            {clicks}
          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('links');

  return { 'links': Links.find({}).fetch() };
}, LinkList);
