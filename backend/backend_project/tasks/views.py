from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from pymongo import MongoClient
from django.contrib.auth.models import User
from bson import ObjectId   # ✅ IMPORTANT

# 🔥 CONNECT TO MONGODB (Docker)
client = MongoClient("mongodb://mongo:27017/")
db = client["intern_db"]
collection = db["tasks"]


# 🔐 GET + POST TASKS
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    try:
        if request.method == 'GET':
            tasks = list(collection.find({"user": request.user.username}))

            # ✅ FIX: convert ObjectId → string
            for task in tasks:
                task["_id"] = str(task["_id"])

            return Response(tasks)

        if request.method == 'POST':
            data = request.data

            if not data.get("title"):
                return Response({"error": "Title is required"})

            data["user"] = request.user.username
            collection.insert_one(data)

            return Response({"message": "Task added"})

    except Exception as e:
        return Response({"error": str(e)})


# 🔐 UPDATE + DELETE TASK
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request, id):
    try:
        object_id = ObjectId(id)  # ✅ FIX

        if request.method == 'PUT':
            updated = collection.update_one(
                {"_id": object_id, "user": request.user.username},
                {"$set": request.data}
            )

            if updated.matched_count == 0:
                return Response({"error": "Task not found"})

            return Response({"message": "Task updated"})

        if request.method == 'DELETE':
            deleted = collection.delete_one(
                {"_id": object_id, "user": request.user.username}
            )

            if deleted.deleted_count == 0:
                return Response({"error": "Task not found"})

            return Response({"message": "Task deleted"})

    except Exception as e:
        return Response({"error": str(e)})


# 🔥 REGISTER USER
@api_view(['POST'])
def register(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"})

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"})

        User.objects.create_user(username=username, password=password)

        return Response({"message": "User created successfully"})

    except Exception as e:
        return Response({"error": str(e)})