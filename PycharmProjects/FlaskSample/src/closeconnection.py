from FlaskSample import db, app

# losing any open connection
@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()