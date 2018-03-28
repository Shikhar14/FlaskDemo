FROM alpine

RUN apk update && \
    apk add py-pip
# copy over our requirements.txt file
COPY requirements.txt /tmp/

# upgrade pip and install required python packages
RUN pip install --upgrade pip setuptools && \
    pip install -r /tmp/requirements.txt

# copy over our app code
COPY ./src /src
WORKDIR /src

CMD ["python", "FlaskSample.py"]

