from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User


class TestTask(TestCase):

    def setUp(self):
        # create user
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )

        # login user
        self.client = APIClient()
        response = self.client.post('/login/', {
            "username": "testuser",
            "password": "testpass"
        })

        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    # ✅ TEST REGISTER
    def test_register(self):
        response = self.client.post('/register/', {
            "username": "newuser",
            "password": "newpass"
        })

        self.assertEqual(response.status_code, 200)

    # ✅ TEST LOGIN
    def test_login(self):
        response = self.client.post('/login/', {
            "username": "testuser",
            "password": "testpass"
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)

    # ✅ TEST CREATE TASK
    def test_create_task(self):
        response = self.client.post('/tasks/', {
            "title": "Test Task",
            "completed": False
        })

        self.assertEqual(response.status_code, 200)

    # ✅ TEST GET TASKS (FIXED FOR MONGODB CASE)
    def test_get_tasks(self):
        response = self.client.get('/tasks/')

        self.assertEqual(response.status_code, 200)