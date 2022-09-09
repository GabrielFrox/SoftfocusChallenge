FROM python:3.9.13

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "app.py"]

# I've thought about use this command to populate the DB, but i realize
# that DB container and backend goes up at same time, so this command
# unfortunately dont works because he needs a running DB
# CMD  python -c 'import database; database.populate_db()'

EXPOSE 5000
