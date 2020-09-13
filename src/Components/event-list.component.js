import React, { Component } from 'react';
import coco from './coco.png';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import "./Event.css";

const Event = props => (
    <div id="card">
    <Card text={"#0C1B2F"} bg={"light"}  style={{ width: '30rem' }}>
    <Card.Body className="card-body">
        <Card.Title>{props.event.eventName}</Card.Title>
        <Image className="img-responsive imgStyle" width="50" height="50" src={coco} roundedCircle />
        <Card.Text className="card-text">{ props.event.invited}</Card.Text>
        <Card.Text className="card-text">{props.event.description}</Card.Text>
        <Card.Text className="card-text">{props.event.date.substring(0,10 )}</Card.Text>
        <Button className="btn" variant="primary">Ping</Button>
    </Card.Body>    
</Card>
</div>
)

export default class eventsList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {events: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/events/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEvent(id) {
    axios.delete('http://localhost:5000/events/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }
  
  eventList() {
    return this.state.events.map(currentevent => {
      return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Events</h3>
          <tbody>
            { this.eventList() }
          </tbody>
      </div>
    )
  }
}