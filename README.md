# PICTOGRAMMER

### Objective


### Development
서로 다른 터미널에서 실행해야 함

First, run the backend sever
```
cd server
node server.js
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

It should be running in `http://localhost:8000`

```
cd model
uvicorn main:app --reload
```
