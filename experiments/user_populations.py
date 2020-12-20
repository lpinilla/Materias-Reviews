from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection

#conectando con mongo
mongo = MongoClient('localhost:27018')
mongodb = mongo['bd2tp']
users_coll = mongodb['usuarios']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://localhost:7687')

#usuarios hadcodeados
users = [
    {
        'nombre': 'gaston',
        'legajo': 12345,
        'descripcion': 'descripcion gaston',
        'foto': None
    },
    {
        'nombre': 'micaela',
        'legajo': 56789,
        'descripcion': 'descipcion micaela',
        'foto': None
    },
    {
        'nombre': 'lautaro',
        'legajo': 87643,
        'descripcion': 'descripcion lautaro',
        'foto': None
    }
]

#agregar usuarios a mongo
#users_coll.insert_many(users)

#agregar nodos a neo
#for u in users:
#    q = "CREATE (u:Usuario {{nombre:'{}', legajo:'{}'}});".format(u['nombre'], u['legajo'])
#    neo4j.query(q)

#agregar las relaciones a neo
u1 = users[2]['legajo']
u2 = users[1]['legajo']
q = "MATCH (u1:Usuario {{legajo: '{}'}}), (u2:Usuario {{legajo: '{}'}}) \
    CREATE (u1)-[:amigoDe]->(u2), (u2)-[:amigoDe]->(u1);\
    ".format(u1, u2)
neo4j.query(q)
