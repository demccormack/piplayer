import sys
from os import environ, listdir, path
from urllib.parse import quote, unquote

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=environ['CORS_ORIGINS'].split())

mediaRoot = environ['MEDIA']

@app.route('/', methods=['GET'])
def get_films():
    dir = unquote(request.args.get('dir'))
    dirPath = path.join(mediaRoot, dir)
    return jsonify(filmTree(dirPath))

def filmTree(dir):
    ls = sorted(listdir(dir))
    result = []
    for item in ls:
        fullPath = path.join(dir, item)
        url = quote(fullPath[len(mediaRoot):])
        result.append({'name': item, 'type': 'directory' if path.isdir(fullPath) else 'file', 'url': url})
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
