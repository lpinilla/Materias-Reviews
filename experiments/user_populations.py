from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection

#conectando con mongo
mongo = MongoClient('localhost:27017')
mongodb = mongo['bd2tp']
users_coll = mongodb['usuarios']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://localhost:7687')

#usuarios hadcodeados
users = [
    {
        'nombre': 'gaston',
        'legajo': 12345,
        'descripcion': None,
        'foto': None
    },
    {
        'nombre': 'micaela',
        'legajo': 56789,
        'descripcion': None,
        'foto': None
    },
    {
        'nombre': 'lautaro',
        'legajo': 87643,
        'descripcion': None,
        'foto': None
    }
]

#agregar usuarios a mongo
users_coll.insert_many(users)

#agregar nodos a neo
for u in users:
    q = "CREATE (u:Usuario {{nombre:'{}', legajo:'{}'}});".format(u['nombre'], u['legajo'])

#agregar las relaciones a neo
u1 = users[0]['legajo']
u2 = users[1]['legajo']
q = "MATCH (u1:User {{legajo: '{}'}}), \
           (u2:User {{legajo: '{}'}}}) \
    CREATE (m1)-[r:amigoDe]->(m2),\
    CREATE (m2)-[r:amigoDe]->(m1);\
    ".format(u1, u2)
neo4j.query(q)
