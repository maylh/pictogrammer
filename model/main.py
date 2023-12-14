# from fastapi import FastAPI
# import test

# app = FastAPI()

# @app.get("/")
# def test1():
#     return test.result

from typing import Union
from fastapi import FastAPI
import test

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/test")
def read_root():
    return {"data": test.result}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}