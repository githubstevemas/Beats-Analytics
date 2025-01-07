from django.shortcuts import render

from main import extract


def index(request):

    artists, songs, duration = extract()

    return render(request,
                  'home.html',
                  {"artists": dict(artists)})
