from typing import Optional
from fastapi import FastAPI
from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection
import json

app = FastAPI()

#conectando con mongo
mongo = MongoClient('mongo:27017')
mongodb = mongo['bd2tp']
materias_coll = mongodb['materias']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://neo4j:7687')


@app.get("/")
def read_root():
    return {"Hello": "world"}

@app.get('/all_courses/')
def get_all_courses():
    materias = []
    cursor = materias_coll.find({}, {'_id': False})
    return {'materias': [doc for doc in cursor]}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
