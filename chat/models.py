from django.db import models
class User(models.Model):
    username=models.CharField( max_length=50)
    password=models.CharField( max_length=50)
    def __str__(self):
            return self.username
class Connect(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,unique=True
    )
    friends = models.ManyToManyField(User,related_name="reciever",)
    def __str__(self):
        return f"{self.user}"
class Messaging(models.Model):
    by=models.ForeignKey(Connect,related_name="sender",on_delete=models.CASCADE)
    to=models.ForeignKey(Connect,on_delete=models.CASCADE)
    message=models.TextField()
    def __str__(self):
        return f"{self.by.user.id} {self.by} --> {self.to.user.id} {self.to} --> {self.message}"
