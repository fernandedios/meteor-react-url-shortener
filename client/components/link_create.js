import React, { Component } from 'react';

class LinkCreate extends Component {
  // whenever we use component state, we have to initialize it as part of the constructor
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }


  handleSubmit(event) {
    event.preventDefault(); // prevent browser refresh when submitting form

    // refs = references
    // refers to a specific dom element that is being produced by our component
    // console.log(this.refs.link.value);

    // meteor method is a safe and protected way when working with data
    // call meteor method inside links.js
    Meteor.call('links.insert', this.refs.link.value, (error) => {

      // console.log(error);
      if(error) {
        this.setState({ error: 'Enter a valid URL' });
      }
      else {
        this.setState({ error: '' });
        this.refs.link.value = '';
      }

    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="link" className="form-control" />
        </div>
        <div className="text-danger">{this.state.error}</div>
        <button className="btn btn-primary">Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;