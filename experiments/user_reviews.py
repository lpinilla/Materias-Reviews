from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection

#conectando con mongo
mongo = MongoClient('localhost:27018')
mongodb = mongo['bd2tp']
review_coll = mongodb['reviews']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://localhost:7687')

#escribir una review

review = {
    'autor': '87643',
    'rating': 5,
    'comentario': 'Materia escencial para la carrera',
    'references': '72.08'
}

#agregar la review a mongo
review_coll.insert_one(review)

#agregar la review a neo

