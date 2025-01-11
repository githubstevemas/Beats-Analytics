import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from main import extract


def index(request):

    return render(request,
                  'home.html')


@csrf_exempt
def process_json(request):
    if request.method == 'POST' and request.FILES.get('json_file'):
        try:
            json_file = request.FILES['json_file']
            json_data = json.load(json_file)

            result = extract(json_data)
            sorted_songs = dict(
                sorted(result['songs'].items(), key=lambda item: item[1],
                       reverse=True))

            return render(request, 'home.html', {
                'artists': result['artists'],
                'songs': sorted_songs,
                'total_duration': result['total_duration'],
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return render(request, 'home.html')
