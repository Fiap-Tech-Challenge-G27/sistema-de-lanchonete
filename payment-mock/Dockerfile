FROM python:3.10-slim

ARG CURRENT_DIR

WORKDIR /app/

# Install system dependencies
RUN apt-get update --yes && \
    apt-get install --yes \
      curl
      
ENV POETRY_HOME="/opt/poetry"

ENV PATH="$POETRY_HOME/bin:$PATH"

# Install poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

COPY . .

RUN poetry config virtualenvs.create false && \
    poetry install

CMD python main.py