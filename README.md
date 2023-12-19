# :gift: PICTOGRAMMER

![리드미](https://github.com/maylh/pictogrammer/assets/113450966/da07c4da-723f-4387-966c-cfbb25c7409d)

# :clipboard: Index

<details>
  <summary><h3>Member</h3></summary>
  
  - **KIM GAHYEON**
    - UI/UX Design
    - React implementation
    - FastAPI development

  - **KIM SHINWOOK**
    - Firebase DB development
    - Node.js development

  - **JANG WONJUN**
    - AI Modeling(efficientnet)
    - AI Modeling(wavenet)

</details>

<details>
  <summary><h3>Project Introduction</h3></summary>

  ![image](https://github.com/wonjun16/first/assets/94692391/948be9b7-3243-41cb-be99-7b5b887a9a25)
  Pictogrammer is a web-based edu game service where users 
  <span style="background-color:#fff5b1"> draw pictures and AI matches </span> 
  them to study English words.  
  This project aims to help children learn English words in an easy and fun way.  
  
  
  ![image](https://github.com/wonjun16/first/assets/94692391/aff151d8-940a-47eb-93a6-10e12f00a285)
  The QuickDraw game developed by Google inspired Pictogrammer.  
  Through this project, we expect users to go beyond simply memorizing English words and strengthen their intuition and memory for words.  

</details>

<details>
  <summary><h3>Dataset</h3></summary>

  - **Open Source Dataset**
    - The Quick Draw Dataset is a collection of 50 million drawings across 345 categories
    - [Quick Draw Dataset](https://github.com/googlecreativelab/quickdraw-dataset)
   
  - **Check word frequency**
    - [COCA](https://www.wordfrequency.info/intro.asp)

</details>

<details>
  <summary><h3>Model</h3></summary>

  - **EfficientNetB0**
    - Original thesis : [EfficientNet](https://arxiv.org/abs/1905.11946)
  
  - **Wavenet**
    - Original thesis : [Wavenet](https://arxiv.org/abs/1711.10433)
    - Code referenced : [Wavenet Classifier](https://github.com/mjpyeon/wavenet-classifier/blob/master/WaveNetClassifier.py)

  <!-- Add more details about the model -->

</details>

<details>
  <summary><h3>Demo Video</h3></summary>

  [Demo](https://www.youtube.com/watch?v=3kXYX32ech4&feature=youtu.be)

</details>

<details>
  <summary><h3>How to Run</h3></summary>

First, run the backend server
```
node server.js
```
```
Python -m uvicorn main:app --port 8008 --reload
```

Then, run the frontend server
```
npm start
```


</details>
