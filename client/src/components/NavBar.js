import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="button-group">
        {this.props.showHome ? (
          <Link to="/">
            <Button variant="outline-dark">Home</Button>
          </Link>
        ) : (
          ""
        )}

        <Link to="/history">
          <Button variant="outline-dark" onClick={this.props.history}>
            Match History
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline-dark" onClick={this.props.profile}>
            View Profile
          </Button>
        </Link>

        <Button variant="outline-danger" onClick={this.props.authCreds.logout}>
          Logout
        </Button>
        
        {this.props.showCreateGame ? (
          <Button variant="info" onClick={this.props.createGameClick}>
            Create Game
          </Button>
        ) : (
          ""
        )}
        {this.props.authCreds.auth.user.role ? (
          <Link to="/report">
            <Button variant="outline-dark" onClick={this.props.report}>
             View Report
            </Button>
          </Link>
        ) : (
          ""
        )}

        {this.props.showCreateGame ? (
          <Button variant="info" onClick={this.props.withAI}>
            With AI
          </Button>
        ) : (
          ""
        )}
      </div>
      
    );
  }
}
export default AuthContext(NavBar);
