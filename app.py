from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.2ko6qez.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')
@app.route('/soon')
def introduce_index():
   return render_template('soon.html')


@app.route("/study", methods=["POST"])
def study_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']

    comment_list = list(db.study.find({}, {'_id': False}))
    count = len(comment_list) + 1

    doc = {
        'num':count,
        'name':name_receive,
        'comment':comment_receive,
        'done':0
    }
    db.study.insert_one(doc)

    return jsonify({'msg':'댓글 입력'})

@app.route("/study/done", methods=["POST"])
def study_done():
    num_receive = request.form['num_give']
    db.study.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': '입력 완료!'})

@app.route("/study", methods=["GET"])
def study_get():
    comment_list = list(db.study.find({}, {'_id': False}))
    return jsonify({'good':comment_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)