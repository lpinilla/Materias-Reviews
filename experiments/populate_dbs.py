from pymongo import MongoClient
from Neo4jConnection import Neo4jConnection
import random
import json

#conectando con mongo
mongo = MongoClient('localhost:27017')
mongodb = mongo['bd2tp']
users_coll = mongodb['usuarios']
review_coll = mongodb['reviews']
materias_coll = mongodb['materias']

#conectando con neo4j
neo4j = Neo4jConnection(uri='bolt://localhost:7687')

#generando users

users = []

def create_users():
    legajo_base = 12345
    l_offset = 0
    print("reading names")
    f_names = open('names.txt', 'r')
    print("creating users")
    for name in f_names:
        user = {
            'nombre': name,
            'legajo': legajo_base + l_offset,
            'descripcion': 'descripcion de ' + name,
            'foto': None
        }
        users.append(user)
        l_offset += 1

def add_users_to_dbs():
    print("adding users to db")
    users_coll.insert_many(users)
    for u in users:
        q = "CREATE (u:Usuario {{nombre:'{}', legajo:'{}'}});".format(u['nombre'], u['legajo'])
        neo4j.query(q)

#amigos
def make_friend(u1, u2):
    l1 = u1['legajo']
    l2 = u2['legajo']
    q = "MATCH (u1:Usuario {{legajo: '{}'}}), (u2:Usuario {{legajo: '{}'}}) \
        CREATE (u1)-[:amigoDe]->(u2), (u2)-[:amigoDe]->(u1);".format(l1, l2)
    neo4j.query(q)

def create_friend_relationships():
    print("creating friend relationships")
    for i in range(len(users) * 2):
        u1 = random.choice(users)
        u2 = u1
        while(u2 == u1):
            u2 = random.choice(users)
        make_friend(u1, u2)

#borrar relaciones repetidas
def clear_repeated_relationships():
    print("eliminating duplicate relationships")
    q = "MATCH (s)-[r]->(e) with s,e,type(r) as typ, tail(collect(r)) as coll foreach(x in coll | delete x)"
    neo4j.query(q)

materias = []
correlativas = {}

def parse_courses(arr):
    for entry in arr:
        if entry['name'].find('Electivas') == 0:
            continue
        aux = {
            'codigo'    : entry['code'],
            'nombre'    : entry['name'],
            'creditos'  : entry['credits']
        }
        #checkear si no se agregó antes (por nombre)
        found = False
        for materia in materias:
            if aux['nombre'] == materia['nombre']:
                found = True
        if not found:
            materias.append(aux)
        #correlativas
        if entry['dependencies']:
            dependencies = entry['dependencies']['dependency']
            if not isinstance(dependencies, list):
                dependencies = [dependencies]
            correlativas[entry['code']] = dependencies

def create_courses():
    print("reading courses")
    f = open('plan_de_carrera.json', 'r')
    careerplan = json.load(f)['careerplan']
    #añadir las materias a las dbs
    print("parsing courses")
    for section in careerplan['section']:
        if section['name'] == 'Ciclo Profesional - Orientaciones':
            continue
        if section['terms']:
            for term in section['terms']['term']:
                parse_courses(term['entries']['entry'])
        if section['withoutTerm']:
            if section['withoutTerm']['withoutTerm']:
                parse_courses(section['withoutTerm']['withoutTerm'])

def add_courses_to_dbs():
    print("adding courses to dbs")
    result = materias_coll.insert_many(materias)
    for m in materias:
        q = "CREATE (m:Materia {{codigo: '{}', nombre: '{}' }})".format(m['codigo'], m['nombre'])
        neo4j.query(q)
    for c in correlativas:
        for m in correlativas[c]:
            q = "MATCH (m1:Materia {{codigo: '{}' }}), (m2:Materia {{codigo: '{}' }}) CREATE (m1)-[r:correlativaDe]->(m2)".format(c, m)
            neo4j.query(q)


# REVIEWS

reviews = []
comments = open('comentarios.txt', 'r').readlines()

def create_reviews():
    print("creating reviews")
    for u in users:
        for i in range(random.randrange(10)):
            review = {
                'autor': u['legajo'],
                'rating': random.randrange(1, 6),
                'comentario': random.choice(comments),
                'referencia': random.choice(materias)['codigo']
            }
            reviews.append(review)

def add_reviews_to_dbs():
    print("adding reviews to db")
    #agregar la review a mongo
    review_coll.insert_many(reviews)
    #agregar la review a neo (arista con propiedad)
    for review in reviews:
        q = "MATCH (u:Usuario {{legajo: '{}' }}), (m:Materia {{ codigo: '{}'}}) CREATE (u)-[r:opina {{ puntaje: '{}' }}]->(m)".format(review['autor'], review['referencia'], review['rating'])
        neo4j.query(q)


create_users()
add_users_to_dbs()
create_friend_relationships()
create_courses()
add_courses_to_dbs()
create_reviews()
add_reviews_to_dbs()
clear_repeated_relationships()

