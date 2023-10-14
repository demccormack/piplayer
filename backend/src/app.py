# pylint: disable=missing-module-docstring
import sys
from os import environ, listdir, path
from urllib.parse import quote, unquote

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=environ["CORS_ORIGINS"].split())

MEDIA_ROOT = environ["MEDIA"]


@app.route("/", methods=["GET"])
def get_files():
    """
    Returns the contents of the requested directory in JSON form.
    """
    dir_name = unquote(request.args.get("dir"))
    dir_path = path.join(MEDIA_ROOT, dir_name)
    return jsonify(contents(dir_path))


def contents(directory):
    """
    Returns the contents of the requested directory as an array of dictionaries.
    """
    sorted_list = sorted(listdir(directory))
    result = []

    for item in sorted_list:
        full_path = path.join(directory, item)
        url = quote(full_path[len(MEDIA_ROOT) :])
        result.append(
            {
                "name": item,
                "type": "directory" if path.isdir(full_path) else "file",
                "url": url,
            }
        )

    return result


if __name__ == "__main__":
    cli_args = sys.argv[1:]

    if cli_args:
        HOST = cli_args[0]
        if len(cli_args) > 1:
            PORT = cli_args[1]
        else:
            PORT = 8080
    else:
        HOST = "127.0.0.1"

    app.run(host=HOST, port=PORT, debug=True)
