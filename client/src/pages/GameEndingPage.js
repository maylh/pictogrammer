import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/GameEndingPage.css";
import { withRouter } from "react-router-dom";
import constants from "../Utils/Constants";

import DefaultProfile from "../images/blank_profile.png";
import image1 from "../images/profileImg/1.png";
import image2 from "../images/profileImg/2.png";
import image3 from "../images/profileImg/3.png";
import image4 from "../images/profileImg/4.png";
import image5 from "../images/profileImg/5.png";
import image6 from "../images/profileImg/6.png";

class GameEndingPage extends React.Component {

  // 이미지 배열 정의
  images = [image1, image2, image3, image4, image5, image6];

  
  constructor(props) {
    super(props);
    this.state = {
      usersInLobby: this.sortWinner(this.props.players),
    };
    this.sortWinner = this.sortWinner.bind(this);
    this.playAgainClicked = this.playAgainClicked.bind(this);
    this.leaveClicked = this.leaveClicked.bind(this);
  }

  sortWinner(arr) {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (arr[j - 1].score > arr[j].score) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    arr.reverse();
    let displayarray = [];
    for (let i = 0; i < arr.length; i++) {
      displayarray.push(
        <Card key={i} id={i} className="player" style={{ width: "6rem" }}>
          <Card.Img
            variant="top"
            src={this.images[arr[i].profileKey - 1] || DefaultProfile}
            alt="no image"
          />
          <Card.Body className="playerGameInfo" style={{ padding: "0px" }}>
            <Card.Title className="playerName">{arr[i].name}</Card.Title>
            <Card.Text className="playerScore">
              Points: {arr[i].score}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return displayarray;
  }
  playAgainClicked() {
    const lobby_id = this.props.match.params.lobbyID;
    this.props.socket.emit("lobby-state-change", lobby_id, constants.IN_LOBBY);
  }

  leaveClicked() {
    if (this.props.isHost) {
      const lobby_id = this.props.match.params.lobbyID;
      this.props.socket.emit("dc-game", lobby_id);
    }

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="page">
        <div className="content">
          <div className="podium">
            <div className="playerPodium">
              <p>{this.state.usersInLobby[1]}</p>
              <div className="podium2"></div>
            </div>
            <div className="playerPodium">
              <p>{this.state.usersInLobby[0]}</p>
              <div className="podium1"></div>
            </div>
            <div className="playerPodium">
              <p>{this.state.usersInLobby[2]}</p>
              <div className="podium3"></div>
            </div>
          </div>
          <div className="restPlayers">
            {[...this.state.usersInLobby.slice(3)]}
          </div>
          <div className="buttonSet">
            {this.props.isHost ? (
              <Button
                className="playAgain"
                variant="secondary"
                onClick={this.playAgainClicked}
              >
                Play Again
              </Button>
            ) : (
              ""
            )}

            <Button
              className="leave"
              variant="success"
              onClick={this.leaveClicked}
            >
              Leave
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(GameEndingPage);
