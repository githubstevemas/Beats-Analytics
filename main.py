import json

from collections import Counter

with open('Spotify Account Data/StreamingHistory_music_0.json',
          'r',
          encoding='utf-8') as file:
    data = json.load(file)

artists_list = []
songs_list = []
duration = []

for element in data:

    artists_list.append(element["artistName"])
    songs_list.append(element["trackName"])
    duration.append(element["msPlayed"])


artist_nb = Counter(artists_list)
print(artist_nb)

songs_nb = Counter(songs_list)
print(songs_nb)

total_duration = sum(duration)
print(total_duration / 3600000)
