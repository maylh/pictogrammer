import axios from 'axios';
import { Speech } from './speech';
import { classes61 } from '../components/ui/data';

// alert custom
import Swal from "sweetalert2";

const base = "http://127.0.0.1:";
const port = "8008/";


// 백엔드 서버가 작동 중인지 확인하고 상태를 업데이트하는 함수
async function setisBackendUpFromAPI(isBackendUp, setisBackendUp) {
    // 이미 서버 작동중이면 요청 안 보냄
    if (isBackendUp) { return; }

    // "wakeup" 엔드포인트에 대한 GET 요청 보냄
    const response = await axios.get(base + port + "wakeup");

    // 콘솔에 서버 상태를 로깅합니다.
    console.log('DEBUG server status ', response.data);

    // 서버 상태가 "up"이면 백엔드 상태를 true로 설정
    if (response.data.status === "up") {
        setisBackendUp(true);
    }
}

// 예측을 건너뛸지 여부 제어 변수
var doNotPredict = false;

// 백엔드 서버를 사용하여 base64 이미지 예측을 수행하는 함수
const predictB64 = async (curB64) => {
    // 입력이 null이거나 예측이 비활성화된 경우 요청없이 반환
    if ((curB64 === null) || (doNotPredict === true)) {
        doNotPredict = false;
        return;
    }

    // base64 이미지 데이터와 함께 "predict" 엔드포인트에 대한 POST 요청을 보냄
    const response = await axios.post(base + port + "predict", {
        "b64Image": curB64
    });

    // 예측 결과 반환
    return response.data.preds;
}


function getRandomInt(min, max) {
    // 최댓값은 포함
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// 음성 출력 문자열
var voiceDisplayStr = "";

// api.js (client 폴더 내)

// ... (기존 코드)

let doodleCount = 0;
let correctCount = 0; // 맞춘 횟수
const maxDoodleCount = 3;

const resetDoodle = (preds, curDoodle, setDoodle, setTime, timeFieldRef, runningTimerRef, voiceDisplayRef, contextRef) => {
    // 예측 결과가 정의되지 않은 경우 반환
    if (preds === undefined) { return; }

    // 5번만 반복
    if (doodleCount >= maxDoodleCount) {
        doNotPredict = true;
        Swal.fire({
            position: 'top', // 화면 가운데 상단
            icon: 'success',
            title: `Game is over!\nYou got ${correctCount} out of ${maxDoodleCount} correct`,
            showConfirmButton: false,
            timer: 150000
          });
          
        //alert(`Game is over! You got ${correctCount} out of ${maxDoodleCount} correct!`);
        return false;
    }

    // 콘솔에 예측 배열을 로깅합니다.
    console.log("DEBUG preds array ", preds);

    // 예측 결과에서 레이블을 음성 디스플레이 문자열에 연결합니다.
    preds.forEach(e => {
        voiceDisplayStr = voiceDisplayStr + "<code>" + e[0] + "</code>";
    });

    // 예측 결과를 반복합니다.
    for (let i = 0; i < preds.length; i++) {
        const [label, score] = preds[i];

        // 현재 둘둘이 레이블과 일치하는 경우 둘둘을 재설정하고 관련 작업을 수행합니다.
        if (curDoodle === label) {
            doodleCount++;
            correctCount++; // 맞춘 횟수 증가
            // 타이머 및 둘둘 이름을 재설정합니다.
            if (runningTimerRef.current !== null) {
                clearInterval(runningTimerRef.current);
            }

            // 메시지를 로그하고 타이머를 재설정합니다.
            console.log('found!');
            Speech("You do it right!");
            clearInterval(runningTimerRef.current);
            contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // 새로운 무작위 단어 생성
            setDoodle(classes61[getRandomInt(0, 60)]);

            // 초기 시간을 설정하고 카운트다운 타이머를 시작
            var timeleft = 20;
            runningTimerRef.current = setInterval(function () {
                timeleft--;
                timeFieldRef.current.textContent = timeleft;
                if (timeleft <= 0) {
                    doodleCount++;
                    timeleft = 20;
                    contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    doNotPredict = true;
                    setDoodle(classes61[getRandomInt(0, 60)]);

                }
            }, 1000);

            // voice string 초기화
            voiceDisplayStr = "";
            return true;
        }


        Speech(label);
    }

    // 음성 디스플레이 엘리먼트를 연결된 디스플레이 문자열로 업데이트합니다.
    voiceDisplayRef.current.innerHTML = voiceDisplayStr;

    // 음성 디스플레이 문자열을 초기화합니다.
    voiceDisplayStr = "";

    // 일치하지 않는 것을 나타내기 위해 false를 반환합니다.
    return false;
};


// 다른 모듈에서 사용하기 위해 함수를 내보냅니다.
export { setisBackendUpFromAPI, predictB64, resetDoodle};
