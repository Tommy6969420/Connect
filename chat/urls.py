from django.urls import path
from. import views
urlpatterns = [
    path('login/',views.authenticate,name='login'),
    path("",views.index,name='index'),
    path('get-api/',views.MessagingView1.as_view(),name="update-message"),
    path('get-api/<int:reciever>/<int:sender>',views.get_message,name="get-message"),
    path('get-user/<int:id>',views.get_user)

]
