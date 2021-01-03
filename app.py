import os
from flask import Flask, request, abort, jsonify

app = Flask(__name__)


@app.route('/api', methods=['GET'])
def get_films():
    filmdir = '/var/www/html/media/Films'
    wlk = os.walk(filmdir)
    film = []
    for root, dirs, files in wlk:
        for name in files:
            dot = name.split('.')
            if dot[-1] in ['mp4', 'mov', 'flv', 'wmv', 'avi', 'm4v']:
                fullpath = os.path.join(root, name)
                film.append({'name': name, 'url': fullpath[14:len(fullpath)]})
    return jsonify(film)


if __name__ == '__main__':
    app.run(host='raspberrypi', port=8080, debug=True)