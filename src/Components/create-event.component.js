import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeInvited = this.onChangeInvited.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventName: '',
      invited: '',
      description: '',
      date: new Date(),
      users: [],
      email:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            invited: response.data[0].username.email,
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

    axios.post('http://localhost:5000/events/add', event)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  sendEmail(e) {
    e.preventDefault();
  
    emailjs.sendForm('gmail', 'template_2xne4ia', e.target, 'user_Zrx8NBiYji1DI9oyu4Mip')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  render() {
    return (
    <div>
      <h3>Create New Event Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Event Name: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.eventName}
              onChange={this.onChangeEventName}
              />
        </div>
        <div className="form-group">
          <label>Who's Invited: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.invited}
              onChange={this.onChangeInvited}>
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
          <label>Description: </label>
          <input type="text"
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
          <input type="submit" value="Create Event Log" className="btn" />
        </div>
      </form>
    </div>
    )
  }
}