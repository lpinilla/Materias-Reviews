import json
from pymongo import MongoClient

f = open('plan_de_carrera.json', 'r')

careerplan = json.load(f)['careerplan']

#ejemplo de seccion y materias
#{
#"name" : "Ciclo Básico",
#"terms" : {
#    "term" : [ {
#        "year" : "1",
#        "period" : "1",
#        "entries" : {
#            "entry" : [ {
#                "type" : "subject",
#                "name" : "Sistemas de Representación",
#                "code" : "31.08",
#                "credits" : "3",
#                "dependencies" : "null"
#            } ]
#        }
#    } ]
#},
#"withoutTerm" : "null"
#}

# estructura de materia en la db
#materia = {
#   código,
#   nombre,
#   creditos
#}

#conectando con mongo
mongo = MongoClient('localhost:27017')
mongodb = mongo['bd2tp']
materias_coll = mongodb['materias']

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

for section in careerplan['section']:
    if section['name'] == 'Ciclo Profesional - Orientaciones':
        continue
    if section['terms']:
        for term in section['terms']['term']:
            parse_courses(term['entries']['entry'])
    if section['withoutTerm']:
        if section['withoutTerm']['withoutTerm']:
            parse_courses(section['withoutTerm']['withoutTerm'])

result = materias_coll.insert_many(materias)
print(result)
