from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('mongodb+srv://junho:test@cluster0.zlxkvp3.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/junho')
def introduce_jun():
    return render_template('junho.html')

@app.route('/soon')
def introduce_soon():
    return render_template('soon.html')




@app.route("/comment", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give']
    writer_receive = request.form['writer_give']
    soonjae_receive = request.form['soonjae_give']

    comment_list = list(db.comment.find({}, {'_id': False}))
    count = len(comment_list) + 1

    doc = {
        'num': count,
        'comment': comment_receive,
        'del': 0,
        'writer': writer_receive,
        'name': 0,
        'soonjae': soonjae_receive
    }
    db.comment.insert_one(doc)

    return jsonify({'msg': '댓글 완료!'})


@app.route("/comment/del", methods=["POST"])
def comment_del():
    num_receive = request.form['num_give']

    db.comment.update_one({'num': int(num_receive)}, {'$set': {'del': 1}})

    return jsonify({'msg': '삭제 완료!'})


@app.route("/comment", methods=["GET"])
def comment_get():
    comment_list = list(db.comment.find({}, {'_id': False}))

    return jsonify({'comments': comment_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
