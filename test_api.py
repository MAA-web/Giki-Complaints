import requests as re
import json

payload = {
    'hi' : 'hi'
}

headers = {
    'Content-Type':'application/json'
}

r = re.post('http://localhost:3000/api/user/case/create', json=json.dumps(payload), headers=headers)

print(r)
print(r.text)