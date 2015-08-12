from django import forms
from icraf_dr.models import Category, Coverage, Source, Year, Main

class CategoryForm(forms.ModelForm):
    cat_num = forms.CharField(max_length=255, help_text='Enter cat_num');
    cat_alp = forms.CharField(max_length=255, help_text='Enter cat_alp');
    cat_name = forms.CharField(max_length=255, help_text='Enter cat_name');
    
    class Meta:
        model = Category

class MainForm(forms.ModelForm):
    category = forms.ModelChoiceField(queryset=Category.objects.all(), help_text='Enter category')
    coverage = forms.ModelChoiceField(queryset=Coverage.objects.all(), help_text='Enter coverage')
    source = forms.ModelChoiceField(queryset=Source.objects.all(), help_text='Enter source')
    year = forms.ModelChoiceField(queryset=Year.objects.all(), help_text='Enter year')
    basename = forms.CharField(max_length=255, help_text='Enter basename');
    
    class Meta:
        model = Main