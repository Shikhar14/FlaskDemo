FROM nginx:alpine
FROM python:2


# copy over our requirements.txt file
COPY requirements.txt /tmp/

# upgrade pip and install required python packages
RUN pip install -U pip
RUN pip install -r /tmp/requirements.txt

# copy over our app code
COPY ./src /src
WORKDIR /src

CMD ["python", "FlaskSample.py"]
