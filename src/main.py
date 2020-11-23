from typing import Optional
from fastapi import FastAPI, Cookie, Request
from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware


#declarando objeto UserID

class UserID(BaseModel):
    user_id : int

app = FastAPI()

#origins = [
#    "http://localhost",
#    "http://localhost:8080",
#    "http://localhost:8081",   
#]
#
#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=origins,
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#)

#conectando con mongo
mongo = MongoClient('mongo:27017')
mongodb = mongo['bd2tp']
materias_coll = mongodb['materias']
users_coll = mongodb['usuarios']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://neo4j:7687')


@app.get("/")
def read_root():
    return {"Hello": "wold"}


############################## MATERIAS #################################

@app.get('/all_courses')
def get_all_courses():
    materias = []
    cursor = materias_coll.find({}, {'_id': False})
    return {'materias': [doc for doc in cursor]}

@app.get('/course/{codigo_materia}')
def get_course(codigo_materia: str):
    cursor = materias_coll.find({'codigo': codigo_materia}, {'_id': False})
    return {'materia' : cursor[0]}

@app.get('/current_user_courses')
def read_item(user_id: Optional[str] = None):
    if not user_id:
        return {'Error': 'user_id cookie not set'}
    q = "MATCH (m:Materia), (u:Usuario {{ legajo: '{}'}})\
         RETURN (u)-[:cursando]->(m)".format(user_id)
    result = neo4j.query(q)
    return {"mis_materias": result}


############################## REVIEWS #################################



############################## USUARIOS #################################

@app.get('/users/{legajo}')
def get_user(legajo: int):
    cursor = users_coll.find({'legajo': legajo}, {'_id': False})
    return {'usuario' : cursor[0]}


@app.get('/friends')
def get_friends(user: UserID):
    q = "MATCH (u1:Usuario {{legajo: '{}'}})-[:amigoDe]->(u2:Usuario) \
        RETURN u2".format(user.user_id)
    result = neo4j.query(q)
    return {'amigos': result}

@app.post('/users/{legajo}/friend_request')
def add_friend(legajo: int, user: UserID):
    q = "MATCH (u1:Usuario {{legajo: '{}'}}), (u2:Usuario {{legajo: '{}'}}) \
        CREATE (u1)-[:amigoDe]->(u2), (u2)-[:amigoDe]->(u1)\
        RETURN u1, u2;".format(user.user_id, legajo)
    result = neo4j.query(q)
    return {'result': result}

############################## TESTING #################################

@app.get('/jsontest')
def reflecting_json_test(user: UserID):
    return {'test': user.user_id}

