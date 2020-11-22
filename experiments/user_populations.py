from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection

#conectando con mongo
mongo = MongoClient('localhost:27017')
mongodb = mongo['bd2tp']
users_coll = mongodb['users']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://localhost:7687')

#usuarios hadcodeados
users = [
    {
        'nombre': 'gaston',
        'descripcion': None,
        'foto': None
    },
    {
        'nombre': 'micaela',
        'descripcion': None,
        'foto': None
    },
    {
        'nombre': 'lautaro',
        'descripcion': None,
        'foto': None
    }
]

#agregar usuarios a mongo
users_coll.insert_many(users)

#agregar nodos a neo
for u in users:
    q = "CREATE (u:Usuario {{nombre: '{}'}});".format(u['nombre'])

#agregar las relaciones a neo
u1 = users[0]['nombre']
u2 = users[1]['nombre']
q = "MATCH (u1:User {{nombre: '{}'}}), \
           (u2:User {{nombre: '{}'}}}) \
    CREATE (m1)-[r:amigoDe]->(m2),\
    CREATE (m2)-[r:amigoDe]->(m1);\
    ".format(u1, u2)
