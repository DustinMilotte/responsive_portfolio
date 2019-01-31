document.addEventListener("DOMContentLoaded", function(event) {
  var music = document.getElementById('music');
  var songs = document.getElementsByClassName('song');
  var songsArray = Array.prototype.slice.call(songs);
  var songItems = document.getElementsByClassName('song-item');
  var songItemsArray = Array.prototype.slice.call(songItems);
  var playButton = document.getElementById('audio-play-button');
  var timeline = document.getElementById('timeline');
  var playhead = document. getElementById('playhead');
  var progressBar = document.getElementById('progress-bar');
  var currentSongIndex = 0;
 	// timeline width adjusted for playhead
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  var forwardButton = document.getElementById('audio-forward-button');
  var backButton = document.getElementById('audio-back-button');
  var albumEnded = false;
 
  // add click listener on the play button
  playButton.addEventListener('click', playButtonFunc);
  // set music play to first song
  music.src = songsArray[currentSongIndex].href;

  // for each song in the album
  songItemsArray.forEach(function(songItem, index){
    // if the song is clicked
    songItem.addEventListener('click', function(e){
      // stop from opening new audio player on new page
      e.preventDefault();
      // set the currentSongIndex
      currentSongIndex = index;
      // set this song as music player src
      music.src = songsArray[currentSongIndex].href;
      updateCurrentSong(songsArray, currentSongIndex);
      // start playing the song
      music.play();
      // show pause button
      playButton.className = 'play-button fas fa-pause';
    })
  });

  // add click listener to forward button
  forwardButton.addEventListener('click', forwardButtonFunc);

  // add click listener to back button
  backButton.addEventListener('click', backButtonFunc);


  // handle songs ending
	music.addEventListener('ended', function(e){
		// increment current song index
		currentSongIndex ++;
		// if its the last song
		if(currentSongIndex === songsArray.length){
			currentSongIndex = 0;
			music.src = songsArray[currentSongIndex].href;
      songSelected = false;
      playButton.className = 'play-button fas fa-play';
      albumEnded = true;
      updateCurrentSong(songsArray, currentSongIndex);
		} else {
      // play the next song
			music.src = songsArray[currentSongIndex].href;
      music.play();
      playButton.className = 'play-button fas fa-pause';
      updateCurrentSong(songsArray, currentSongIndex);
		}
	});

  
  // Gets audio file duration
  music.addEventListener("canplaythrough", function() {
    duration = music.duration;
    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);
  }, false);

  // timeline.addEventListener('mouseover', function(){
  //   timeUpdate();
  //   playhead.setAttribute('style', 'visibility: visible');
  // });
  // timeline.addEventListener('mouseout', function(){
  //   playhead.setAttribute('style', 'visibility: hidden');
  // });


  // makes timeline clickable
  timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  }, false);

  

  function playButtonFunc(){
    if(music.paused){
      music.play();
      playButton.className = 'play-button fas fa-pause';
      if(currentSongIndex === 0) {
        updateCurrentSong(songsArray, currentSongIndex);
      }
    } else {
      music.pause();
      playButton.className = 'play-button fas fa-play';
    }
  }

  function forwardButtonFunc(){
    if( currentSongIndex !== songsArray.length - 1 && !music.paused){
      currentSongIndex ++;
      music.pause();
      music.src = songsArray[currentSongIndex].href;
      music.play();
    } else if (currentSongIndex !== songsArray.length - 1 && music.paused) {
      currentSongIndex ++;
      music.src = songsArray[currentSongIndex].href;
    }
  }
  
  function backButtonFunc(){
    if( currentSongIndex !== 0 && !music.paused){
      currentSongIndex --;
      music.pause();
      music.src = songsArray[currentSongIndex].href;
      music.play();
    } else if (currentSongIndex !== 0 && music.paused) {
      currentSongIndex --;
      music.src = songsArray[currentSongIndex].href;
    }
  }
  

	// Synchronizes playhead position with current point in audio
  function timeUpdate() {
    timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    console.log("timeline width " + timelineWidth);
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    progressBar.style.width = playPercent + "px";
    if (music.currentTime == duration) {
        playButton.className = ""; //TODO // ??
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

  function updateCurrentSong(songsArray, currentSongIndex) {
    // clear previous current song from class lists
    songsArray.forEach(function (song, index) {
      song.className = "song";
    });
    if(albumEnded){
      albumEnded = false;
      // add current song class
    } else {
      songsArray[currentSongIndex].className = "song current-song";
    }
  }

  // window.setInterval(function(){console.log('currentSongIndex = ' + currentSongIndex)}, 1);
  window.onresize = function(){
    console.log('resize');
    timeUpdate();
  };
});


		