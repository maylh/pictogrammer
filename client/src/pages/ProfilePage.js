import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavBar from "../components/NavBar";
import "../styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import Dialog from "react-bootstrap-dialog";
import DefaultProfile from "../images/blank_profile.png";
import image1 from "../images/profileImg/1.png";
import image2 from "../images/profileImg/2.png";
import image3 from "../images/profileImg/3.png";
import image4 from "../images/profileImg/4.png";
import image5 from "../images/profileImg/5.png";
import image6 from "../images/profileImg/6.png";

class ProfilePage extends React.Component {
  // 이미지 배열 정의
  images = [image1, image2, image3, image4, image5, image6];

  constructor(props) {
    super(props);
    this.state = {
      userUsername: this.props.authCreds.auth.user.name,
      userImageIndex: this.props.authCreds.auth.user.profileKey,
      modalShow: false,
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfilePicture = this.handleProfilePicture.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.handleProfilePick = this.handleProfilePick.bind(this);
  }

  usernameChange(event) {
    this.setState({
      userUsername: event.target.value,
    });
  }

  handleProfilePicture() {
    return this.images.map((image, index) => (
      <img
        key={index + 1}
        id={index + 1}
        className="pokemonImg"
        src={image}
        onClick={this.handleProfilePick}
        alt={`이미지 ${index + 1}`}
        style={{ margin: "10px 20px 15px 15px", width: "120px", height: "140px" }}
      ></img>
    ));
  }

  handleProfilePick(event) {
    this.setState({
      userImageIndex: parseInt(event.target.id, 10),
      modalShow: false,
    });
  }

  handleSubmit() {
    const { authCreds } = this.props;
    const { id } = authCreds.auth.user;
    const { userUsername, userImageIndex } = this.state;

    fetch(`http://localhost:8888/profile/change/name?userID=${id}&newName=${userUsername}&userPicture=${userImageIndex}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed create new room");
      })
      .then((responseJson) => {
        console.log(responseJson);
        authCreds.getUserInfo();
        this.dialog.showAlert("Your update was successful!");
      })
      .catch((error) => {
        console.log(error);
        this.dialog.showAlert("Something went wrong please try again.");
      });
  }

  setModalShow(see) {
    this.setState({
      modalShow: see,
    });
  }

  render() {
    const { userUsername, userImageIndex, modalShow } = this.state;
    const selectedImage = this.images[userImageIndex - 1];

    return (
      <div className="page">
        <div className="content">
          <NavBar className="nav" showCreateGame={false} showHome={true}></NavBar>
          <div className="profilecontainer">
            <div className="profile">
              <div className="picture">
                <img
                  className="profile-picture"
                  src={selectedImage || DefaultProfile}
                  alt="no image"
                ></img>
                <Button
                  variant="primary"
                  className="pickIcon"
                  onClick={() => this.setModalShow(true)}
                >
                  Change Profile Picture
                </Button>
              </div>
              <div className="name">
                <p className="nameTitle">Name :</p>
                <input
                  className="nameInput"
                  type="text"
                  value={userUsername}
                  onChange={this.usernameChange}
                ></input>
              </div>

              <Button
                variant="success"
                className="savebutton"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
              <Dialog
                ref={(component) => {
                  this.dialog = component;
                }}
              />
            </div>
          </div>

          <Modal show={modalShow} onHide={() => this.setModalShow(false)}>
            <Modal.Header>Icons</Modal.Header>
            <Modal.Body>
              <div id="profilePictureContainer" className="modalBody">
                {this.handleProfilePicture()}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={() => this.setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AuthContext(ProfilePage);
