import atexit
import string
import subprocess
import sys
import threading
import webbrowser

# Threading: see https://stackoverflow.com/a/19574155/3347737

import SimpleHTTPServer

from SimpleHTTPServer import BaseHTTPServer
HTTPServer = BaseHTTPServer.HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler # Python 2

with open(sys.argv[1], "r") as f:
    d = "\n".join(f.readlines())
with open("script.js", "r") as f:
    script = "\n".join(f.readlines())

with open("script.tmp.js", "w") as f:
    f.write(string.replace(script, "<DATA_PLACEHOLDER>", d))

server = HTTPServer(('localhost', 0), SimpleHTTPRequestHandler)
thread = threading.Thread(target = server.serve_forever)
thread.daemon = True
thread.start()

def fin():
    server.shutdown()

print('server running on port {}'.format(server.server_port))

atexit.register(fin)

webbrowser.open("http://localhost:{}/viz.html".format(server.server_port))

raw_input("Press Enter to finish...")
