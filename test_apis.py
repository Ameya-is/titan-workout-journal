import urllib.request
import json

def test_req(url, method='GET', data=None, headers=None):
    try:
        h = {'User-Agent': 'Mozilla/5.0'}
        if data:
            h['Content-Type'] = 'application/json'
        if headers:
            h.update(headers)
        req = urllib.request.Request(url, data=data, headers=h, method=method)
        with urllib.request.urlopen(req, timeout=5) as res:
            resp = res.read().decode('utf-8', errors='ignore')
            print(f"[OK {res.status}] {url} -> {resp[:100]}")
            return True, resp
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
        return False, str(e)

# Test KV stores
test_req('https://kvdb.io/test')
test_req('https://api.myjson.online/v1/records', 'GET')
test_req('https://jsonblob.com/api/jsonBlob', 'POST', data=b'{"test": 123}')
test_req('https://restful-api.dev/objects', 'POST', data=b'{"name": "test", "data": {"a": 1}}')
