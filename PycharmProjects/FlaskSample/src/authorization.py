from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from model import User
from FlaskSample import db

# Retrieving password from Database
def get_password(username):
    password = User.query.filter_by(email=username).first()
    if password is None:
        return None
    return password.password;

# Saving Data into the Database
def add_data(data):
    try:
        me = User(data['name'],data['email'],data['password'])
        db.session.add(me)
        db.session.commit()
        return 'Data Saved'
    except IntegrityError:
        db.session.rollback()
        return 'Email Id already Exist';