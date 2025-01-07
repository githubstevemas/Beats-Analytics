import json

from collections import Counter


def extract():

    with open('../Spotify Account Data/StreamingHistory_music_0.json',
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

    artist_counted = Counter(artists_list)
    songs_counted = Counter(songs_list)
    total_duration = sum(duration)

    return (artist_counted.most_common(),
            songs_counted.most_common(),
            total_duration)


if __name__ == '__main__':
    extract()
