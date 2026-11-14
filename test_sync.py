import urllib.request
import json

def test_url(url, data=None):
    try:
        req = urllib.request.Request(url, data=data, headers={'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json'}, method='POST' if data else 'GET')
        with urllib.request.urlopen(req, timeout=5) as res:
            print(url, "STATUS:", res.status, res.read().decode('utf-8')[:100])
    except Exception as e:
        print(url, "FAILED:", e)

# Let's test a few public REST sync options
test_url("https://httpbin.org/post", b'{"test": 123}')
test_url("https://api.myjson.online/v1/records")
