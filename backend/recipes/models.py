from django.db import models

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=200)        # Название
    description = models.TextField(blank=True)      # Описание
    category = models.CharField(max_length=100)     # Категория (например, "Супы", "Десерты")
    # Можешь добавить поля по вкусу: ингредиенты, картинка и т.п.

    def __str__(self):
        return self.title
    
    