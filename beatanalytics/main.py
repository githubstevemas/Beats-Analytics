from collections import Counter


def extract(data):

    artists_list = []
    songs_list = []
    duration = []

    for element in data:

        artists_list.append(element["artistName"])

        song = (element["trackName"], element["artistName"])
        songs_list.append(song)

        duration.append(element["msPlayed"])

    artist_counted = Counter(artists_list)
    songs_counted = Counter(songs_list)
    total_duration = sum(duration)

    formatted_songs = {
        f"{song[0]} - {song[1]}": count for song, count in songs_counted.items()
    }

    return {
        "artists": dict(artist_counted.most_common()),
        "songs": formatted_songs,
        "total_duration": total_duration
    }
