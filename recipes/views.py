from django.shortcuts import render
from django.http import JsonResponse
from .models import Recipe
# Create your views here.
def get_recipes(request):
    recipes = list(Recipe.objects.values())  # Получаем все рецепты
    return JsonResponse({'recipes': recipes})

