import React,{ useState } from 'react';
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar"; // NavBar 가져오기
import "../styles/DictPage.css";

class DictPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryContent: null,
      errorMessage: "",
    };
  }

  loadDictionary() {
    // 'dictionary.txt' 파일 가져오는 함수
    fetch("C:\\Users\\kimsi\\OneDrive\\바탕 화면\\pictogrammer-master\\server\\src\\Game\\dictionary.txt") // 파일 가져오기
      .then((response) => {
        if (response.status === 200) {
          return response.text(); // 텍스트 형식으로 변환
        } else {
          throw new Error("Failed to load dictionary."); // 실패 시 에러 처리
        }
      })
      .then((data) => {
        this.setState({ dictionaryContent: data }, this.forceUpdate);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errorMessage: "Failed to load dictionary." }); // 에러 메시지 저장
      });
  }

  render() {
    const username = this.props.authCreds.auth.user.name || "User"; // 사용자 이름 가져오기

    const { dictionaryContent, errorMessage } = this.state;

    if (errorMessage !== "") {
      return (
        <div className="page">
          <div className="match-history-content">
            <NavBar showCreateGame={false} showHome={true}></NavBar>
            <h2>{errorMessage}</h2>
          </div>
        </div>
      );
    }

    if (!dictionaryContent) {
      return (
        <div className="page">
          <h2>Dictionary not loaded. Please try again later.</h2>
          <button onClick={() => this.loadDictionary()}>Reload Dictionary</button>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="homepage-content">
          <NavBar className="nav" showHome={true}></NavBar>
          <h3>This is {username} 's dictionary!</h3>
          <h2>Dictionary Contents:</h2>
          <pre>{dictionaryContent}</pre>
        </div>
      </div>
    );
  }
}

export default AuthContext(DictPage);