import React, { createRef } from "react";
import "../styles/HomePage.css";
import {
  Accordion,
  Card,
  InputGroup,
  FormControl,
  Overlay,
  Button,
  Popover,
} from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Redirect, withRouter } from "react-router-dom";
import BanPage from "./BanPage";
import AuthContext from "../context/AuthContext";
import { withDeviceDetect } from "../Utils/DeviceDetect";
import { Link } from "react-router-dom";

import DefaultProfile from "../images/blank_profile.png";
import image1 from "../images/profileImg/1.png";
import image2 from "../images/profileImg/2.png";
import image3 from "../images/profileImg/3.png";
import image4 from "../images/profileImg/4.png";
import image5 from "../images/profileImg/5.png";
import image6 from "../images/profileImg/6.png";


class HomePage extends React.Component {

  // 이미지 배열 정의
  images = [image1, image2, image3, image4, image5, image6];

  constructor(props) {
    super(props);
    this.state = {
      gameCode: "",
      showRoomNotFound: false,
    };
    this.joinButtonTarget = new createRef();
    this.handleGameCodeChange = this.handleGameCodeChange.bind(this);
    this.handleJoinGameClicked = this.handleJoinGameClicked.bind(this);
    this.handleCreateGameClicked = this.handleCreateGameClicked.bind(this);
    this.handleAImodePageClicked = this.handleAImodePageClicked.bind(this);
  }

  componentDidMount() {}

  handleMatchHistoryClicked() {
    // TODO: redirect to match history page
  }

  handleViewProfileClicked() {
    // TODO: redirect to profile page
  }

  handleMyDictionaryClicked(){
    // TODO : redirect to profile page
    console.log("handleMyDictionaryClicked called");
  }

  handleAImodePageClicked(){
    console.log("handleAImodePageClicked called");
    
  }

  handleCreateGameClicked() {
    console.log("handleCreateGameClicked called");
    const user = this.props.authCreds.auth.user;
    fetch(
      `http://localhost:8888/lobby/create?hostId=${user.id}&hostName=${user.name}`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": true,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed create new room");
      })
      .then((responseJson) => {
        // redirect to lobby

        const location = {
          pathname: `/game/${responseJson.code}`,
        };
        this.props.history.push(location);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleJoinGameClicked() {
    const user = this.props.authCreds.auth.user;  // 현재 사용자 정보 가져오기
    if (this.state.gameCode === "") return;
    // 서버에 요청
    fetch(`http://localhost:8888/lobby/join2`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: this.state.gameCode, userID: user.id }), // 쿼리 매개변수로 현재 사용자의 ID와 이름이 전달
    })
      .then((res) => {  // 응답 처리
        if (res.status === 200) return res.json();  // 200이면 (클라이언트 요청이 성공적으로 처리되었으면)
        throw new Error("failed fetching room info");
      })
      .then((res_json) => {
        if (res_json.success) {
          const location = {
            pathname: `/game/${res_json.code}`,
          };
          this.props.history.push(location);
        } else {
          this.setState({
            showRoomNotFound: true,
            gameCode: "",
            gameErrorMessage: res_json.message,
          });
          // hide popover after 5 sec
          setTimeout(() => {
            this.setState({ showRoomNotFound: false });
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleGameCodeChange(e) {
    this.setState({
      gameCode: e.target.value,
    });
  }

  render() {
    const user = this.props.authCreds.auth.user;
    if (user.ban) {
      return <Redirect to={"/BanPage"} />;
    } else {
      return (
        <div className="page">
          <div className="homepage-content">

            <NavBar></NavBar> {/* 상단바 */}

            <h3 style={{ marginTop: "40px" }}>Hello, {user.name || "kirby placeholder"} ! </h3>

            <img
              className="profile-picture"
              src={user.profileKey ? this.images[user.profileKey - 1] : DefaultProfile}
              alt="no image"
            ></img>

    
            {/* "Create Game" 버튼 */}
            {!this.props.mobile && (
              <Button variant="info" onClick={this.handleCreateGameClicked} className="createGamebutton">
                Create Game
              </Button>
            )}

          <Link to="/withAI">
          <Button variant="outline-dark" onClick={this.props.withAI} className="withAIbutton">
            with AI
          </Button>
          </Link>

            
            <InputGroup style={{ maxWidth: "70%", margin: "10px auto" }}>
              <FormControl
              
                disabled={this.props.mobile}
                placeholder="Enter room code to join a game !"
                value={this.state.gameCode}
                onChange={this.handleGameCodeChange}
                aria-label="Lobby Code"
              />
              <InputGroup.Append>
                <Button
                  ref={this.joinButtonTarget}
                  disabled={this.props.mobile}
                  variant="success"
                  onClick={this.handleJoinGameClicked}  
                >
                  Join Game
                </Button>
              </InputGroup.Append>
            </InputGroup>

            

            <Overlay 
              target={this.joinButtonTarget}
              show={this.state.showRoomNotFound}
              placement="top"
              onClose={() => this.setState({ showRoomNotFound: false })}
            >
              <Popover>
                <Popover.Content>{this.state.gameErrorMessage}</Popover.Content> 
              </Popover>
            </Overlay> 
            
  
          </div>
        </div>
      );
    }
  }
}

export default AuthContext(withDeviceDetect(HomePage));