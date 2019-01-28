document.addEventListener("DOMContentLoaded", function(event) {
  var music = document.getElementById('music');
  var songs = document.getElementsByClassName('song');
  var songsArray = Array.prototype.slice.call(songs);
  var playButton = document.getElementById('play-button');
  var timeline = document.getElementById('timeline');
  var playhead = document. getElementById('playhead');
  var currentSongIndex = 0;
 	// timeline width adjusted for playhead
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
 

  // add click listener on the play button
  playButton.addEventListener('click', playButtonFunc);
  // set music play to first song
  music.src = songsArray[currentSongIndex].href;
  // for each song in the album
  songsArray.forEach(function(song, index){
    // if the song is clicked
    song.addEventListener('click', function(e){
      // stop from opening new audio player on new page
      e.preventDefault();
      // set the currentSongIndex
      currentSongIndex = index;
      // set this song as music player src
      music.src = this;
      // start playing the song
      music.play();
      // show pause button
      playButton.className = 'play-button fas fa-pause';
    })
  });

  // handle songs ending
	music.addEventListener('ended', function(e){
		// increment current song index
		currentSongIndex ++;
		// if its the last song
		if(currentSongIndex === songsArray.length){
			currentSongIndex = 0;
			music.src = songsArray[currentSongIndex].href;
			// playlistSongsArray.forEach(function (song){
			// 	song.parentNode.className = 'song';
			// })
			songSelected = false;
		} else {
      // play the next song
			music.src = songsArray[currentSongIndex].href;
			music.play();
			// playlistSongsArray.forEach(function (song){
			// 	song.parentNode.className = 'song';
			// })
			// playlistSongsArray[currentSongIndex].parentNode.className = 'current-song song';
		}
	});

  
  // Gets audio file duration
  music.addEventListener("canplaythrough", function() {
    duration = music.duration;
    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);
  }, false);

  // makes timeline clickable
  timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  }, false);

  function playButtonFunc(){
    if(music.paused){
      music.play();
      playButton.className = 'play-button fas fa-pause';
    } else {
      music.pause();
      playButton.className = 'play-button fas fa-play';
    }
  }
  
	// Synchronizes playhead position with current point in audio
  function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        playButton.className = "";
        playButton.className = "play-button fas fa-play";
    }
  }

  // Moves playhead as user drags
	function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
  }

  // returns click as decimal (.77) of the total timelineWidth
	function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
  }

  // Returns elements left position relative to top-left of viewport
	function getPosition(el) {
    return el.getBoundingClientRect().left;
  }
});








		