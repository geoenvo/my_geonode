from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.core.urlresolvers import reverse
from icraf_dr.forms import CategoryForm, MainForm
from icraf_dr.models import Category, Coverage, Source, Year, Main, Slider

from guardian.shortcuts import get_objects_for_user
from geonode.layers.models import Layer

def icraf_home(request, template='icraf_dr/icraf_home.html'):
    """ custom home views handler
    """
    # query layers: published, user has view perm, order by id descending, limit 4
    authorized = get_objects_for_user(
            request.user, 'base.view_resourcebase').values('id')
    layers = Layer.objects.filter(is_published=True)
    layers = layers.filter(id__in=authorized).order_by('-id')[:4]
    
    sliders = Slider.objects.filter(is_published=True).order_by('position')
    
    context_dict = {
        'recent_content': layers,
        'sliders': sliders,
    }
    
    return render_to_response(template, RequestContext(request, context_dict))

    
def index(request, template='icraf_dr/index.html'):
    # Obtain the context from the HTTP request.
    context = RequestContext(request)

    # Query the database for a list of ALL categories currently stored.
    # Order the categories by no. likes in descending order.
    # Retrieve the top 5 only - or all if less than 5.
    # Place the list in our context_dict dictionary which will be passed to the template engine.
    # category_list = Category.objects.order_by('-likes')[:5]
    # context_dict = {'categories': category_list}

    # Render the response and send it back!
    return render_to_response(template, {}, context)

def add_main(request, template='icraf_dr/add_main.html'):
    context = RequestContext(request)
    
    if request.method == 'POST':
        form = MainForm(request.POST, request.FILES)
        
        if form.is_valid():
            # saving manually
            main = Main(
                category=Category.objects.get(pk=request.POST['category']),
                coverage=Coverage.objects.get(pk=request.POST['coverage']),
                source=Source.objects.get(pk=request.POST['source']),
                year=Year.objects.get(pk=request.POST['year']),
                basename=request.POST['basename']
            )
            
            main.save()
            
            #form.save(commit=True)
            
            return HttpResponseRedirect(reverse('icraf_dr_index'))
        else:
            print form.errors
    else:
        form = MainForm()
    
    return render_to_response(template, {'form': form}, context)

def add_category(request, template='icraf_dr/add_category.html'):
    # Get the context from the request.
    context = RequestContext(request)

    # A HTTP POST?
    if request.method == 'POST':
        form = CategoryForm(request.POST)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new category to the database.
            form.save(commit=True)

            # Now call the index() view.
            # The user will be shown the homepage.
            return index(request)
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = CategoryForm()

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    return render_to_response(template, {'form': form}, context)