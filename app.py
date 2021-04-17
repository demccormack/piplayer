import os, urllib.parse
from flask import Flask, request, abort, jsonify

app = Flask(__name__)


@app.route('/api', methods=['GET'])
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
            dot = item.split('.')
            if dot[-1] in ['mp4', 'mov', 'flv', 'wmv', 'avi', 'm4v', 'mp3', 'm4a']:
                result.append({'name': item, 'type': 'file', 'url': url})
    return result


if __name__ == '__main__':
    app.run(host='raspberrypi', port=8080, debug=True)