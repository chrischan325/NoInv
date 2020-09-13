import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// let eventCollection = [
//   {"eventName": "Coco", "eventDesc": "aeroxity, wropswers, chrischan325, hextal"},
//   {"eventName": "New Kennedy Square", "eventDesc": "TheknightXYZ, wujugget, faggot"}
// ]

import Navbar from "./Components/navbar.component"
import EventList from "./Components/event-list.component";
import EditEvent from "./Components/edit-event.component.js";
import CreateEvent from "./Components/create-event.component";
import CreateUser from "./Components/create-user.component";


class App extends Component{


  render() {
    return (
      <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={EventList} />
      <Route path="/edit/:id" component={EditEvent} />
      <Route path="/create" component={CreateEvent} />
      <Route path="/user" component={CreateUser} />
    </Router>
         
          
          
     
     
     
    );
  }
}
   
 

export default App;
