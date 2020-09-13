import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventName = this.onChangeeventName.bind(this);
    this.onChangeInvited = this.onChangeInvited.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventName: '',
      invited: '',
      description: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/events/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          eventName: response.data.eventName,
          invited: response.data.invited,
          description: response.data.description,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.eventName),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeEventName(e) {
    this.setState({
      eventName: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeInvited(e) {
    this.setState({
      invited: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const event = {
      eventName: this.state.eventName,
      invited: this.state.invited,
      description: this.state.description,
      date: this.state.date
    }

    console.log(event);

    axios.post('http://localhost:5000/events/update/' + this.props.match.params.id, event)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Event Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>eventName: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.eventName}
              onChange={this.onChangeeventName}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>invited (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.invited}
              onChange={this.onChangeinvited}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit event Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}