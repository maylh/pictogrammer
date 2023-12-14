import React from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/MatchHistoryPage.css";

class MatchHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "", // 오류 메시지 저장
      gameHistory: [], // 게임 히스토리 저장
      dictionaryContent: "", // 'dictionary.txt' 파일 내용 저장
    };
    this.getLobbies = this.getLobbies.bind(this);
    this.getUserPlacementString = this.getUserPlacementString.bind(this);
    this.getUserScore = this.getUserScore.bind(this);
    this.loadDictionary = this.loadDictionary.bind(this);
  }

  componentDidMount() {
    this.getLobbies(); // 게임 히스토리 가져오기
    this.loadDictionary(); // 'dictionary.txt' 파일 내용 가져오기
  }

  getLobbies() {
    fetch(
      `http://localhost:8888/profile/matches?userID=${this.props.authCreds.auth.user.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed get match history");
      })
      .then((responseJson) => {
        this.setState({
          gameHistory: responseJson.gameHistory,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: "Something went wrong getting match history.",
        });
      });
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

  /*

  loadDictionary() {
  fetch("") // 서버 측 엔드포인트 호출주소를 입력해야함
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to load dictionary.");
      }
    })
    .then((data) => {
      // 서버에서 받은 데이터를 state에 설정
      this.setState({ dictionaryContent: JSON.stringify(data) }, this.forceUpdate);
    })
    .catch((error) => {
      console.error(error);
      this.setState({ errorMessage: "Failed to load dictionary." });
    });
}

  */


  getUserPlacementString(match, username) {
    let placement = match.scores.findIndex((obj) => obj.name === username) + 1;
    return "#" + placement;
  }

  getUserScore(match, username) {
    return match.scores.find((obj) => obj.name === username).score;
  }

  render() {
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
      return <div className="page"><h2>Loading dictionary...</h2></div>;
    }
  
    return (
      <div className="page">
        <div className="match-history-content">
          <NavBar showCreateGame={false} showHome={true}></NavBar>
          <div className="dictionary-content">
            <h2>Dictionary Contents:</h2>
            <pre>{dictionaryContent}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthContext(MatchHistoryPage);
