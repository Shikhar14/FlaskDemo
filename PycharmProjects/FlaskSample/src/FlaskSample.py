import os.path
from flask import Flask, current_app, render_template, request, jsonify
import authorization
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
with app.app_context():
    if os.path.exists('Users'):
        print 'already exists'
    else:
        print 'database created'
        db.create_all()


@app.route('/')
def hello_world():
    return render_template("HTMLs/index.html")

# User Registration
@app.route('/signup', methods=['POST'])
def registration():
    registrationdata = request.get_json(force=True)
    reply=authorization.add_data(data=registrationdata)
    if reply == 'Data Saved':
        return 'Data Saved Successfully'
    else:
        return 'User Already Registered. Please Proceed to Login.'

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    # Getting Password from the Database
    password = authorization.get_password(username=data["email"])
    if password is None:
        return 'No Such User Exist'
    elif data['password'] == password:
        return 'success'


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
