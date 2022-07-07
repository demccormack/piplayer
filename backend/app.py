import os
import sys
import urllib.parse
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for development server only
CORS(app, origins=["http://localhost:3000", "https://127.0.0.1:3000"])


@app.route('/', methods=['GET'])
def get_films():
    dir = request.args.get('dir')
    filmdir = '/var/www/html/media/' + dir
    return jsonify(filmTree(filmdir))

def filmTree(root):
    ls = sorted(os.listdir(root))
    result = []
    for item in ls:
        fullPath = os.path.join(root, item)
        url = urllib.parse.quote(fullPath[14:len(fullPath)])
        if os.path.isdir(fullPath):
            result.append({'name': item, 'type': 'directory', 'url': url})
        else:
            result.append({'name': item, 'type': 'file', 'url': url})
    return result


if __name__ == '__main__':
    cli_args = sys.argv[1:]

    # If the IP and port are supplied as arguments, use them.
    if cli_args:
        host = cli_args[0]
        if len(cli_args) > 1:
            port = cli_args[1]
        else:
            port = 8080
    else:
        host = "127.0.0.1"

    app.run(host=host, port=port, debug=True)