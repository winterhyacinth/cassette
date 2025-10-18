# ᵎ!ᵎ⋆. NOCTURNE ☂‧₊˚ᵎ!ᵎ

## why i made it 
* i love music, and i especially love cassettes -- so, i wanted to incorporate those into a project!! also i wanted to make something purple. purple is nice.

* i wanted to make something i could re-use in the future -- i'm planning on using iframes so i can incorporate this music player into my upcoming portfolio/personal website 

* to explore api integration !

## what it does

* you can input a playlist link (only to PUBLIC/UNLISTED youtube playlists) and it will put your songs into the player. you can skip back and forth, change the volume, and even press the thumbnail to link to the youtube page of a particular song.

* you also get to see the song name animated and moving on the label of the cassette !!

* if the user doesn't input a playlist, it is automatically set to one of my playlists so you can listen to music anyways! i primarily chose comfier songs that I listen to while coding

* intended for web, not mobile

## how i made it
* javascript, css, & html (github codespaces); cassette art drawn in pixquare

* a myriad of w3schools tutorials. i <3 w3schools.

* i utilized youtube's api, which was integrated in order to control playback & dynamically update ui elements (song title, thumbnail, progress bar). the javascript listens for any player events, like going to the previous or next songs and syncs with the yt video data

## struggles & learning

*  it was difficult to extract metadata from the api and match it with my own js elements. i also wrestled with css to make everything fit well in the tiny playlist space, as well as had to figure out how to make the cassette label stay in the same place no matter the zoom level.

* i also don't have too much background js knowledge compared to html and css, so i had to combine a lot of online tutorials for small aspects and manage to make them work together

* learned to sync ui elements with my player state.

* i definitely better understand how to layout using divs in html and control them with css - i also think i am getting better at ui! - my colors and styling look much more simplified and consistent compared to my past projects - at least in my opinion!


[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)