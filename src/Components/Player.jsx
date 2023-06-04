import React, { useState, Component } from 'react';
import { playlist } from "../assets/Helpers/variables";



export const Player = () => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [audioSource, setAudioSource] = useState('https://reto01-media-player-music.web.app/audio/dookie/burnout.mp3');

    //Contador de canciones
    const [contador, setContador] = useState(0);

    //Estados de las cancion actual
    const [banda, setBanda] = useState('Green Day');
    const [album, setAlbum] = useState('Dokie');
    const [año, setAño] = useState('1994');
    const [cancion, setCancion] = useState('Burnout');
    const [lyrics, setLyrics] = useState('<p>I declare I don’t care no more\
    I’m burning up and out and growing bored\
    In my smoked out boring room</p>\
    <p>My hair is shagging in my eyes\
    Dragging my feet to hit the street tonight\
    To drive along these shit town lights</p>\
    <p>I’m not growing up, I’m just burning out\
    And I stepped in line to walk amongst the dead</p>\
    <p>Apathy has rained on me\
    Now I’m feeling like a soggy dream\
    So close to drowning, but I don’t mind</p>\
    <p>I’ve lived inside this mental cave\
    Throw my emotions in the grave\
    Hell, who needs them anyway?</p>\
    <p>I’m not growing up, I’m just burning out\
    And I stepped in line to walk amongst the dead\
    I’m not growing up, I’m just burning out\
    And I stepped in line to walk amongst the dead</p>\
    <p>I’m not growing up, I’m just burning out\
    And I stepped in line to walk amongst the dead\
    I’m not growing up, I’m just burning out\
    And I stepped in line to walk amongst the dead</p>');

    const [duracion, setDuracion] = useState('00:00');
    const [maxDuracion, setMaxDuracion] = useState('00:00');
    const [position, setPosition] = useState(0);
    
    //Funcion que reproduce la cancion
    const reproducirCancion = () => {
        setShowPlayer(!showPlayer);

        const micancion = document.getElementById('miCancion');
        micancion.play();

        const play_btn = document.getElementById('play-btn');
        const pause_btn = document.getElementById('pause-btn');
        pause_btn.classList.remove('hidden');
        play_btn.classList.add('hidden');
    }
    
    const handleAudioLoad = () => {
        const micancion = document.getElementById('miCancion');
        let durationA = micancion.duration;
        let minMax = Math.floor(durationA / 60);
        let secMax = Math.floor(durationA % 60);
        minMax = minMax < 10 ? "0" + minMax : minMax;
        secMax = secMax < 10 ? "0" + secMax : secMax;
        setMaxDuracion(minMax + ":" + secMax);
       
        micancion.addEventListener('timeupdate', () => {
            let durationActual = micancion.currentTime;
            let minProgesive = Math.floor(durationActual / 60)
            let secProgresive = Math.floor(durationActual % 60);
            minProgesive = minProgesive < 10 ? "0" + minProgesive : minProgesive;
            secProgresive = secProgresive < 10 ? "0" + secProgresive : secProgresive;
            setDuracion(minProgesive + ":" + secProgresive);
    
            let position = (durationActual / durationA) * 100;
            setPosition(position);
        });
    };

    //Función para pausar la canción
    const pausarCancion = () => {
        setShowPlayer(!showPlayer);

        const micancion = document.getElementById('miCancion');
        micancion.pause();

        const play_btn = document.getElementById('play-btn');
        const pause_btn = document.getElementById('pause-btn');
        play_btn.classList.remove('hidden');
        pause_btn.classList.add('hidden');
    }

    //Función que avanza una canción
    const retrocederCancion = () => {
        if (contador > 0) {
            setContador(contador - 1);
        } else if (contador == 0) {
            setContador(13);
        }

        const cancionS = playlist.greenDay.dookie.songs[contador];
        const lyricS = playlist.greenDay.dookie.lirycs[contador];
        const src = playlist.greenDay.dookie.src[contador];

        setCancion(cancionS);
        setLyrics(lyricS);
        setAudioSource(src);

    }

    //Función que retrocede una canción
    const avanzarCancion = () => {
        if (contador < 13) {
            setContador(contador + 1);
        } else if (contador == 13) {
            setContador(0);
        }

        const cancionA = playlist.greenDay.dookie.songs[contador];
        const lyricA = playlist.greenDay.dookie.lirycs[contador];
        const src = playlist.greenDay.dookie.src[contador];

        setCancion(cancionA);
        setLyrics(lyricA);
        setAudioSource(src);

    }

    //Función para bajar el volumen

    function handleLowerVolume() {
        const micancion = document.getElementById('miCancion');

        if (micancion.volume > 0.10) {
            micancion.volume -= 0.10;
        }
        else {
            micancion.volume = 0;
        }
    }

    //Función para subir el volumen
    function handleUpVolume() {
        const micancion = document.getElementById('miCancion');

        if (micancion.volume < 0.90) {
            micancion.volume += 0.10;
        }
        else {
            micancion.volume = 1;
        }
    }

    //Funcion para silenciar el volumen
    function muteVolume() {
        const micancion = document.getElementById('miCancion');
        if (micancion) {
            micancion.volume = 0;

            const sound_btn = document.getElementById('sound-btn');
            const mute_btn = document.getElementById('mute-btn');

            mute_btn.classList.remove('hidden');
            sound_btn.classList.add('hidden');
        }
    }

    //Funcion para activar el volumen
    function soundVolume() {
        const micancion = document.getElementById('miCancion');

        if (micancion) {
            micancion.volume = 1;

            const sound_btn = document.getElementById('sound-btn');
            const mute_btn = document.getElementById('mute-btn');

            sound_btn.classList.remove('hidden');
            mute_btn.classList.add('hidden');
        }
    }

    return (
        <>
            <section class="section-mediaplayer" id="section-mediaplayer">
                <div id="container-mediaPlayer" class="container-mediaPlayer">

                    <div id="container-infoSong" class="container-infoSong">


                        <div id="container-imageAlbum" class="container-imageAlbum">
                            <img src="https://reto01-media-player-music.web.app/images/dookie-album.jpg" alt="Album de Green Day Dookie" class="image-album"></img>
                        </div>


                        <div id="text-song" class="text-song">
                            <h1 id="title-band" class="title-band">{banda}</h1>
                            <h2 id="title-album" class="title-album">{album} ({año})</h2>
                            <h3 id="title-song" class="title-song">{cancion}</h3>
                        </div>

                    </div>


                    <div id="bar-under" class="bar-under">
                    <div id="bar-upper" className="bar-upper" style={{ width: `${position}%` }}></div>
                    </div>


                    <div id="time-song" class="time-song">
                        <span id="duration-time" class="duration-time">{duracion}</span>
                        <span id="maxDuration-time" class="maxDuration-time">{maxDuracion}</span>
                    </div>


                    <div id="control-btns" class="control-btns">

                        <a onClick={retrocederCancion} href="#" id="previous-btn" class="previous-btn">
                            <img src="../svg/previous-btn.svg" alt=""></img>
                        </a>

                        <a onClick={reproducirCancion} href="#" id="play-btn" class="play-btn">
                            <img src="../svg/play-btn.svg" />
                        </a>
                        <audio id='miCancion' autoPlay src={audioSource} onLoadedData={handleAudioLoad}/>

                        <a onClick={pausarCancion} href="#" id="pause-btn" class="pause-btn hidden">
                            <img src="../svg/pause-btn.svg" alt=""></img>
                        </a>


                        <a href="#" id="next-btn" class="next-btn">
                            <img onClick={avanzarCancion} src="../svg/next-btn.svg" alt=""></img>
                        </a>

                    </div>


                    <div id="volume-btns" class="volume-btns">

                        <a href="#" id="decrease-btn" class="decrease-btn" onClick={handleLowerVolume}>
                            <img src="../svg/decreaseVolume-btn.svg" alt=""></img>
                        </a>

                        <a href="#" id="sound-btn" class="sound-btn" onClick={muteVolume}>
                            <img src="../svg/sound-btn.svg" alt=""></img>
                        </a>

                        <a href="#" id="mute-btn" class="mute-btn hidden" onClick={soundVolume}>
                            <img src="../svg/mute-btn.svg" alt=""></img>
                        </a>

                        <a href="#" id="increase-btn" class="increase-btn" onClick={handleUpVolume}>
                            <img src="../svg/increaseVolume-btn.svg" alt=""></img>
                        </a>

                    </div>

                </div>

                <div id="container-lyrics" class="container-lyrics">
                    <div id="container-songText" class="container-songText">
                        <h3 id="title-lyrics" class="title-lyrics"><strong>Lyrics</strong></h3>
                        <div id="song-lyrics" class="song-lyrics" dangerouslySetInnerHTML={{__html:lyrics}}></div>

                    </div>
                </div>
            </section>

        </>
    )

}
