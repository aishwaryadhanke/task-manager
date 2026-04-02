FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install django djangorestframework pymongo djangorestframework-simplejwt django-cors-headers

# ✅ MOVE INTO CORRECT FOLDER
WORKDIR /app/backend_project

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]