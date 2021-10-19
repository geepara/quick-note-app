import { List, Fab, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Note from "../components/Note";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Search from "../components/Search";

const styles = {
  fab: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
};

class DisplayNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  updateQuery = (newValue) => {
    this.setState({
      query: newValue,
    });
  };

  includes = (note) => {
    const query = this.state.query.toLowerCase().trim();
    return (
      note.title.toLowerCase().includes(query) ||
      note.text.toLowerCase().includes(query)
    );
  };

  render() {
    const { notes, deleteNote, classes } = this.props;
    return (
      <>
        <Search
          query={this.state.query}
          updateQuery={this.updateQuery}
        ></Search>
        <List>
          {notes.map((note, index) => {
            return <Note note={note} key={index} deleteNote={deleteNote} />;
          })}
        </List>
        <Link to="/add">
          <Fab aria-label={"Add"} className={classes.fab}>
            <Add />
          </Fab>
        </Link>
      </>
    );
  }
}

export default withStyles(styles)(DisplayNotes);
