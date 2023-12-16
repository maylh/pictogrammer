import React, { useEffect, useState } from 'react';
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/DictPage.css";

const DictPage = (props) => {
  const userId = props.authCreds.auth.user.id;  // 현재 사용자 정보 가져오기
  const username = props.authCreds.auth.user.name || "User";
  const [correctWords, setCorrectWords] = useState([]);

  // fetch 부분을 useEffect로 감싸서 비동기적으로 데이터를 가져오도록 변경
  useEffect(() => {
    fetch(`http://localhost:8888/lobby/userDict/${userId}`)
      .then((dictRes) => dictRes.json())
      .then((dictResJson) => {
        if (dictResJson.success) {
          console.log("User dictionary:", dictResJson.correctWords);
          setCorrectWords(dictResJson.correctWords);
        } else {
          console.error("Error getting user dictionary:", dictResJson.error);
        }
      })
      .catch((dictError) => {
        console.error("Error getting user dictionary:", dictError);
      });
  }, [userId]); // userId가 변경될 때마다 useEffect를 다시 실행

  return (
    <div className="page">
      <div className="homepage-content">
        <NavBar className="nav" showHome={true}></NavBar>
        <h3>This is {username}'s dictionary!</h3>

        {/* 맞춘 단어들을 테이블로 렌더링 */}
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Word</th>
            </tr>
          </thead>
          <tbody>
            {correctWords.map((word, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{word}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthContext(DictPage);
