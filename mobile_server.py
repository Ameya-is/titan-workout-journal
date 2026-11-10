import http.server
import socketserver
import socket
import os
import sys
import subprocess
import threading
import time
import re
import webbrowser

PORT = 8080

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
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

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
                print(f"\n   [OK] PUBLIC HTTPS TUNNEL CREATED:")
                print(f"   ---> {tunnel_url}")
                print(f"   (This link opens on ANY phone anywhere - no local Wi-Fi / firewall required!)\n")
                
                # Write tunnel URL to a js file so the app can read it automatically for the QR code!
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
    loopback_url = f"http://localhost:{PORT}"

    print("=" * 70)
    print("   DIARY OF A WIMPY KID - WORKOUT JOURNAL SERVER & MOBILE LAUNCHER")
    print("=" * 70)
    print("\n   [1] Starting Local Server on Port 8080...")
    print(f"       Local Address: {local_url}")

    print("\n   [2] Starting Secure HTTPS Tunnel for Phone Access...")
    tunnel_thread = threading.Thread(target=start_public_tunnel, daemon=True)
    tunnel_thread.start()

    # Wait a few seconds for tunnel to register
    time.sleep(3.5)

    display_url = tunnel_url if tunnel_url else local_url

    print("=" * 70)
    print(f"   📲 SCAN OR OPEN THIS ON YOUR MOBILE PHONE:")
    print(f"      ---> {display_url}")
    print("=" * 70)
    print("   HOW TO INSTALL AS A NATIVE MOBILE APP:")
    print("   1. Open the link above in your phone's browser.")
    print("   2. iPhone: Tap 'Share' ➔ 'Add to Home Screen'.")
    print("   3. Android: Tap 'Install App' or 'Add to Home screen'.")
    print("   4. Runs 100% full-screen offline with custom icon!")
    print("=" * 70)
    print("   (Press Ctrl+C to stop the server anytime)\n")

    try:
        webbrowser.open(display_url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

if __name__ == "__main__":
    run_server()
