from collections import Counter


def extract(data):

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

    return {
        "artists": dict(artist_counted.most_common()),
        "songs": dict(songs_counted.most_common()),
        "total_duration": total_duration
    }


if __name__ == '__main__':
    extract()
