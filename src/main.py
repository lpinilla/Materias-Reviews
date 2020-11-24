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

#declarando objeto Review
class Review(BaseModel):
    user_id : int
    puntaje: int
    comentario: Optional[str] = None
    codigo_materia: str

class RecommendationMinScore(BaseModel):
    user_id : int
    min_score : Optional[int] = 0

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#conectando con mongo
mongo = MongoClient('mongo:27017')
mongodb = mongo['bd2tp']
materias_coll = mongodb['materias']
users_coll = mongodb['usuarios']
reviews_coll = mongodb['reviews']

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
    q = "MATCH (m:Materia), (u:Usuario {{ legajo: '{}'}})\
         RETURN (u)-[:cursando]->(m)".format(user_id)
    result = neo4j.query(q)
    return {"mis_materias": result}


############################## REVIEWS #################################

@app.get('/review/{codigo_materia})')
def get_my_course_review(codigo_materia: str, user: UserID):
    cursor = reviews_coll.find({'autor': user.user_id}, {'_id':False})

@app.get('/review/{codigo_materia}/puntaje')
def get_my_review_score(codigo_materia: str, user: UserID):
    result = reviews_coll.find({'autor': str(user.user_id), 'referencia': codigo_materia}, {'_id':False, 'rating':True})
    return {'puntaje': result[0]['rating']}

@app.get('/review/{codigo_materia}/comentario')
def get_my_review_comment(codigo_materia: str, user: UserID):
    result = reviews_coll.find({'autor': str(user.user_id), 'referencia': codigo_materia}, {'_id':False, 'comentario':True})
    return {'comentario': result[0]['comentario']}

@app.get('/reviews')
def get_my_reviews(user: UserID):
    results = reviews_coll.find({'autor': str(user.user_id)},{'_id':False, 'autor':False})
    return {'mis_reviews': [rev for rev in results]}

@app.post('/review/add_review')
def add_new_review(review: Review):
    review = {
    'autor': str(review.user_id),
    'puntaje': str(review.puntaje),
    'comentario': review.comentario,
    'referencia': review.codigo_materia
    }
    #insertar a mongo
    reviews_coll.insert_one(review)
    #insertar a neo
    q = "MATCH (u:Usuario {{legajo: '{}' }}), (m:Materia {{ codigo: '{}'}})         CREATE (u)-[r:opina {{ puntaje: '{}' }}]->(m)".format(review['autor'], review['referencia'], review['puntaje'])
    neo4j.query(q)
    return {'result': 'success'}

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

############################## TESTING ####################################

@app.get('/recommendations')
def get_recommendation(rec: RecommendationMinScore):
    q = "MATCH (u1:Usuario {{legajo: '{}'}})-[:amigoDe]->(u2:Usuario)-[o:opina]->(m:Materia) \
         WHERE o.puntaje > '{}' \
         RETURN m;".format(rec.user_id, rec.min_score)
    result = neo4j.query(q)
    return {'recommendations': result}

########################### RECOMMENDATIONS ###############################

@app.get('/jsontest')
def reflecting_json_test(user: UserID):
    return {'test': user.user_id}


# curl -i -H "Content-Type: application/json" --request POST --data '{"user_id": 87643, "puntaje":2, "comentario": null, "codigo_materia": "31.08" }' localhost:4444/review/add_review

#curl -i -H "Content-Type: application/json" --request GET --data '{"user_id": 87643}' localhost:4444/reviews

#curl -i -H "Content-Type: application/json" --request GET --data '{"user_id": 12345, "min_score": 3}' localhost:4444/recommendations
