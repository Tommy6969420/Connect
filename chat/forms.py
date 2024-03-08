from django import forms  
from.models import Messaging

class MessagingForm(forms.ModelForm):
    
    class Meta:
        model=Messaging
        fields="__all__"