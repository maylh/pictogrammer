import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Dictionary.css";

class dictionaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      dictionary: {},
      userId: this.props.authCreds.auth.user.id, // 사용자 ID를 가져옵니다.
    };
    this.loadDictionary = this.loadDictionary.bind(this);
    this.getUserWords = this.getUserWords.bind(this);
  }


  componentDidMount() {
    this.loadDictionary();
  }

  loadDictionary() {
    fetch("C:\\Users\\kimsi\\OneDrive\\바탕 화면\\pictogrammer-master\\server\\src\\Game\\dictionary.txt")
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        } else {
          return Promise.reject(new Error(`Failed to load dictionary. Response status code: ${response.status}`));
        }
      })
      .then((data) => {
        const dictionary = {};
        const lines = data.split("\n"); // 각 줄을 분리합니다.
        for (const line of lines) {
          const [userId, word] = line.split(" - "); // userId와 단어를 분리합니다.
          if (!dictionary[userId]) {
            dictionary[userId] = []; // 사용자 ID에 해당하는 배열을 생성합니다.
          }
          dictionary[userId].push(word); // 해당 배열에 단어를 추가합니다.
        }
  
        this.setState({ dictionary }); // dictionary 상태를 업데이트합니다.
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errorMessage: "Failed to load dictionary." }); // 에러 메시지를 설정합니다.
      });
  }

  getUserWords() {
    const userWords = this.state.dictionary[this.state.userId]; // 사용자 단어 목록을 가져옵니다.
    if (!userWords) {
      return []; // 사용자 단어가 없으면 빈 배열을 반환합니다.
    }
    return userWords.map((word) => ( // 사용자 단어 목록을 JSX로 변환합니다.
      <li key={word}>{word}</li>
    ));
  }

  render() {
    const userWords = this.getUserWords(); // 사용자 단어 목록을 가져옵니다.

    if (this.state.errorMessage !== "") { // 에러 메시지가 있으면 에러 메시지를 표시합니다.
      return (
        <div className="page">
          <NavBar showCreateGame={false} showHome={true}></NavBar>
          <h2>{this.state.errorMessage}</h2>
        </div>
      );
    }

    return (
      <div className="page">
        <NavBar showCreateGame={false} showHome={true}></NavBar>
        <div className="dictionary-content">
          <h2>Your Words</h2>
          <ul>
            {userWords.map((word) => (
              <li key={word}>
                <div className="word-container">
                  <div className="word">
                    {word}
                  </div>
                  <div className="deletion-button">
                    <Button variant="danger" onClick={() => this.deleteWord(word)}>삭제</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  deleteWord(word) {
    const newDictionary = this.state.dictionary;
    const userId = this.state.userId;
    newDictionary[userId].splice(newDictionary[userId].indexOf(word), 1);
    this.setState({ dictionary: newDictionary });
  }
}

export default AuthContext(dictionaryPage);