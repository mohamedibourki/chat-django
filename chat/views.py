from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the home page.")

def chat(request):
    return HttpResponse("Hello, world. You're at the chat index.")