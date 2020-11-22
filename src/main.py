from typing import Optional
from fastapi import FastAPI, Cookie
from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection
import json

app = FastAPI()

#conectando con mongo
mongo = MongoClient('mongo:27017')
mongodb = mongo['bd2tp']
materias_coll = mongodb['materias']
users_coll = mongodb['usuarios']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://neo4j:7687')


@app.get("/")
def read_root():
    return {"Hello": "world"}


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
    q = "MATCH (m:Materia), (u:User {{ legajo: '{}'}})\
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
def get_friends(user_id: Optional[str] = Cookie(None)):
    if not user_id:
        return {'Error': 'No está logueado'}
    q = "MATCH (u1:User {{legajo: '{}'}}), (u2:User) \
        RETURN (u2)<-[r:amigoDe]-(u1)"
    result = neo4j.query(q)
    return {'amigos': result}

@app.post('/friend_request/{legajo}')
def add_friend(legajo: int, user_id: Optional[str] = Cookie(None)):
    q = "MATCH (u1:User {{legajo: '{}'}}), \
           (u2:User {{legajo: '{}'}}}) \
    CREATE (m1)-[r:amigoDe]->(m2),\
    CREATE (m2)-[r:amigoDe]->(m1);\
    ".format(user_id, legajo)
    result = neo4j.query(q)
    return {'friend_request_result': result}

