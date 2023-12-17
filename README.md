# PICTOGRAMMER

### Objective


### Development
서로 다른 터미널에서 실행해야 함

First, run the backend sever
```
cd server
node server.js

cd pyServer
Python -m uvicorn main:app --port 8008 --reload
```
It should be running in `http://localhost:8888`


Then, run the frontend server
```
cd client
npm start
```

Exit
'''
ctrl+c
'''

