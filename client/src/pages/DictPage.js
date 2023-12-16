// DictPage.js
import React from 'react';
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar"; // NavBar 가져오기
import "../styles/DictPage.css";

class DictPage extends React.Component {
  render() {
    const username = this.props.authCreds.auth.user.name || "User"; // 사용자 이름 가져오기

    return (
      <div className="page">
        <div className="homepage-content">
            <NavBar className="nav" showHome={true}></NavBar>
            <h3>This is {username} 's dictionary!</h3>
            {/* 이곳에 추가적인 컴포넌트 또는 내용을 추가할 수 있습니다. */}
        </div>
      </div>
    );
  }
}

export default AuthContext(DictPage);
