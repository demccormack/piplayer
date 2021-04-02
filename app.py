import os
from flask import Flask, request, abort, jsonify

app = Flask(__name__)


@app.route('/api', methods=['GET'])
def get_films():
    filmdir = '/var/www/html/media'
    return jsonify(filmTree(filmdir))

def filmTree(root):
    ls = sorted(os.listdir(root))
    result = []
    for item in ls:
        fullPath = os.path.join(root, item)
        if os.path.isdir(fullPath):
            result.append({'name': item, 'content': filmTree(fullPath)})
        else:
            dot = item.split('.')
            if dot[-1] in ['mp4', 'mov', 'flv', 'wmv', 'avi', 'm4v', 'mp3', 'm4a']:
                result.append({'name': item, 'url': fullPath[14:len(fullPath)]})
    return result


if __name__ == '__main__':
    app.run(host='raspberrypi', port=8080, debug=True)