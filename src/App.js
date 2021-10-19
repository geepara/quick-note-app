import React, { Component } from "react";
import { Container } from "@material-ui/core";
import DisplayNotes from "./pages/DisplayNotes";
import UpsertNote from "./pages/UpsertNote";
import { Route, Switch } from "react-router";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    const notes = window.localStorage.getItem("notes");
    this.setState({
      notes: notes ? JSON.parse(notes) : [],
    });
  }

  saveNotes = () => {
    window.localStorage.setItem("notes", JSON.stringify(this.state.notes));
  };

  editNote = (note) => {
    this.setState((state) => {
      return {
        notes: state.notes.map((n) => (n.id === note.id ? note : n)),
      };
    });
  };

  addNote = (note) => {
    this.setState((state) => {
      return {
        notes: [
          ...state.notes,
          Object.assign(note, {
            id: uuidv4(),
          }),
        ],
      };
    }, this.saveNotes);
  };

  deleteNote = (note) => {
    this.setState((state) => {
      return {
        notes: this.state.notes.filter((n) => n.id !== note.id),
      };
    }, this.saveNotes);
  };

  render() {
    const { notes } = this.state;
    return (
      <Container>
        <Switch>
          <Route exact path="/">
            <DisplayNotes notes={notes} deleteNote={this.deleteNote} />
          </Route>
          <Route path="/add">
            <UpsertNote upsertNote={this.addNote} />
          </Route>
          <Route path="/edit">
            <UpsertNote upsertNote={this.editNote} />
          </Route>
        </Switch>
      </Container>
    );
  }
}

export default App;
