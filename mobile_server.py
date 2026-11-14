import http.server
import socketserver
import socket
import os
import sys
import subprocess
import threading
import time
import re
import json
import webbrowser

PORT = 8080
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "workout_database.json")

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/sync'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            if os.path.exists(DB_FILE):
                with open(DB_FILE, 'r', encoding='utf-8') as f:
                    content = f.read()
                self.wfile.write(content.encode('utf-8'))
            else:
                self.wfile.write(b'{"workouts":[],"version":2}')
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/sync'):
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode('utf-8')
            try:
                data = json.loads(body)
                with open(DB_FILE, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"success":true,"message":"Data synced to PC server successfully"}')
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                err_msg = json.dumps({"success": False, "error": str(e)})
                self.wfile.write(err_msg.encode('utf-8'))
            return
        super().do_POST()

tunnel_url = None

def start_public_tunnel():
    global tunnel_url
    try:
        cmd = ['ssh', '-R', f'80:localhost:{PORT}', '-o', 'StrictHostKeyChecking=no', 'nokey@localhost.run']
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        
        start_time = time.time()
        while time.time() - start_time < 12:
            line = proc.stdout.readline()
            if not line:
                break
            match = re.search(r'https://[a-zA-Z0-9\-]+\.lhr\.life', line)
            if match:
                tunnel_url = match.group(0)
                print(f"\n   [OK] SECURE HTTPS MOBILE TUNNEL CREATED:")
                print(f"   ---> {tunnel_url}")
                print(f"   (Scan or open this on phone to sync with PC in real-time!)\n")
                
                js_content = f"window.PUBLIC_TUNNEL_URL = '{tunnel_url}';\n"
                with open('tunnel_info.js', 'w', encoding='utf-8') as f:
                    f.write(js_content)
                break
    except Exception as e:
        print(f"Tunnel note: {e}")

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()
    local_url = f"http://{local_ip}:{PORT}"

    print("=" * 72)
    print("   MASTER 14-DAY HYPERTROPHY JOURNAL - SYNC SERVER & MOBILE LAUNCHER")
    print("=" * 72)
    print(f"\n   [1] Local Wi-Fi Address : {local_url}")

    tunnel_thread = threading.Thread(target=start_public_tunnel, daemon=True)
    tunnel_thread.start()

    time.sleep(3.5)

    display_url = tunnel_url if tunnel_url else local_url

    print("=" * 72)
    print(f"   PHONE LINK (Scan or Open on Phone):")
    print(f"   ---> {display_url}")
    print("=" * 72)
    print("   [PWA / Mobile App Features]:")
    print("   1. Auto-filled reps & Smart +2.5kg Progressive Overload")
    print("   2. Real-time sync to PC 'workout_database.json'")
    print("   3. 100% offline-ready in gym basements via LocalStorage")
    print("   4. Install on Android: Chrome menu -> 'Install app'")
    print("=" * 72)
    print("   (Press Ctrl+C to close server)\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        httpd.serve_forever()

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
