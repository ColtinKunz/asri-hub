# First stage - build and install
FROM python:3.9.6-slim as builder

# install pre-requisites
RUN apt-get update && apt-get install -y libpq-dev gcc

# set up non-root user
RUN groupadd --gid 1000 worker &&\
    useradd --home-dir /home/worker --create-home --uid 1000\
        --gid 1000 --shell /bin/bash --skel /dev/null worker
COPY .bashrc /home/worker
USER worker

# install dependencies
WORKDIR /app
COPY ./requirements.txt /app/
RUN pip install --user --no-warn-script-location -r requirements.txt


# Second stage - transplant code into a clean image
FROM python:3.9.6-slim as app

# set up non-root user
RUN groupadd --gid 1000 worker &&\
    useradd --home-dir /home/worker --create-home --uid 1000\
        --gid 1000 --shell /bin/bash --skel /dev/null worker
COPY .bashrc /home/worker
USER worker

# set environment variable for python access to stdout in container
ENV PYTHONUNBUFFERED 1

# specify working directory
WORKDIR /app

# copy over dependencies from build stage
COPY --from=builder /home/worker/.local /home/worker/.local

# copy over source code as root, but change ownership to worker
USER root
COPY ./backend .
RUN chown -R worker:worker /app
USER worker

# update the path variable
ENV PATH=/home/worker/.local/bin:$PATH

# Set the default port
EXPOSE 8000

# set entrypoint
ENTRYPOINT ["daphne", "-b", "0.0.0.0", "backend.asgi:application", "-p", "8000"]
