import ReactPlayer from 'react-player';
import React, { useReducer, useRef } from 'react';
import './video.scss';
import { ReactComponent as PlayButton } from 'icons/play.svg';
import { ReactComponent as MaxVolumn } from 'icons/max-volumn.svg';
import { ReactComponent as FullScreenIcon } from 'icons/fullscreen.svg';
import { ReactComponent as Pause } from 'icons/pause.svg';
import { VideoSeekSlider } from 'react-video-seek-slider';
import 'react-video-seek-slider/styles.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import playCenter from 'images/play-center.png';
import screenfull from 'screenfull';

function convertMinute(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.round(duration - minutes * 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

const DesktopPlayBar = ({
  setState,
  states,
  changeTime,
  onClickFullscreen,
}) => {
  return (
    <div className={'controls-wrapper'}>
      <div style={{ width: 20 }}>
        {states.isPlay ? (
          <Pause onClick={() => setState({ isPlay: false })} />
        ) : (
          <PlayButton onClick={() => setState({ isPlay: true })} />
        )}
      </div>
      {states.duration ? (
        <div className='process-wrapper'>
          <p className='time-text' style={{ margin: 0 }}>
            {convertMinute(states.playedSeconds)}
          </p>
          <div
            style={{
              width: '30vw',
              margin: 10,
              marginTop: 0,
            }}
          >
            <VideoSeekSlider
              max={states.duration}
              currentTime={states.playedSeconds}
              progress={states.loadedSeconds}
              onChange={changeTime}
              offset={0}
              secondsPrefix='00:00:'
              minutesPrefix='00:'
            />
          </div>
          <p className='time-text'>{convertMinute(states.duration)}</p>
        </div>
      ) : (
        <div />
      )}
      <div className='display-inline'>
        <MaxVolumn
          onClick={() => setState({ showVolume: !states.showVolume })}
        />
        <div style={{ width: 15 }} />
        <FullScreenIcon onClick={() => onClickFullscreen()} />
      </div>
      {states.showVolume && (
        <div className='slider-wrapper'>
          <Slider
            vertical
            className='slider'
            min={0}
            max={100}
            value={states.volume}
            defaultValue={0}
            trackStyle={{ backgroundColor: 'rgb(74, 168, 66)', height: 10 }}
            onChange={(val) => setState({ volume: val })}
            handleStyle={{
              borderColor: 'rgb(74, 168, 66)',
              backgroundColor: 'rgb(74, 168, 66)',
            }}
          />
        </div>
      )}
    </div>
  );
};

const MobilePlayBar = ({ setState, states, changeTime, onClickFullscreen }) => {
  return (
    <div className='controls-wrapper-mobile'>
      <div className={'display-inline-space-between'}>
        <div className={'display-inline'}>
          {states.isPlay ? (
            <Pause onClick={() => setState({ isPlay: false })} />
          ) : (
            <PlayButton onClick={() => setState({ isPlay: true })} />
          )}
          <span className='time-text' style={{ marginLeft: 20 }}>
            {convertMinute(states.playedSeconds)}
          </span>
        </div>
        <div className='display-inline'>
          <span className='time-text' style={{ marginRight: 20 }}>
            {convertMinute(states.duration)}
          </span>
          <MaxVolumn
            onClick={() => setState({ showVolume: !states.showVolume })}
          />
          <div style={{ width: 10 }} />
          <FullScreenIcon onClick={() => onClickFullscreen()} />
        </div>
      </div>
      <div
        style={{
          width: '100vw',
        }}
      >
        <VideoSeekSlider
          max={states.duration}
          currentTime={states.playedSeconds}
          progress={states.loadedSeconds}
          onChange={changeTime}
          offset={0}
          secondsPrefix='00:00:'
          minutesPrefix='00:'
        />
      </div>
    </div>
  );
};

export const CustomVideo = ({ url, isDesktop }) => {
  const playerRef = useRef(null);
  const videoScreen = useFullScreenHandle();
  const [states, setState] = useReducer(
    (states, newState) => ({ ...states, ...newState }),
    {
      isPlay: false,
      showVolume: false,
      volume: 50,
      duration: 0,
      playedSeconds: 0,
      loadedSeconds: 0,
      isFullscreen: false,
    }
  );

  function onClickFullscreen() {
    if (!isDesktop) {
      videoScreen?.enter().then(() => {
        console.log('in full screen');
      });
    } else {
      if (screenfull.isEnabled) {
        screenfull.request(playerRef.current.wrapper).then(() => {});
      }
    }
  }

  function onProgress(props) {
    setState({
      playedSeconds: props.playedSeconds,
      loadedSeconds: props.loadedSeconds,
    });
  }

  function changeTime(time) {
    playerRef.current.seekTo(time, 'seconds');
    setState({ playedSeconds: time });
  }

  function reportChange(state) {
    setState({
      isFullScreen: state,
    });
  }

  return (
    <div className='player-wrapper'>
      <FullScreen handle={videoScreen} onChange={reportChange}>
        <ReactPlayer
          style={{ backgroundColor: 'black' }}
          playsinline={false}
          url={url}
          width={isDesktop ? (states.isFullScreen ? '100vw' : '50vw') : '100vw'}
          //fixed for video ratio 9:16
          height={
            isDesktop
              ? states.isFullScreen
                ? '100vh'
                : '28.125vw'
              : states.isFullScreen
              ? '100vh'
              : '56.25vw'
          }
          playing={states.isPlay}
          ref={playerRef}
          volume={states.volume / 100}
          onProgress={onProgress}
          onDuration={(duration) => setState({ duration })}
        />
        {isDesktop ? (
          <DesktopPlayBar
            states={states}
            setState={setState}
            changeTime={changeTime}
            onClickFullscreen={onClickFullscreen}
          />
        ) : (
          <MobilePlayBar
            states={states}
            setState={setState}
            changeTime={changeTime}
            onClickFullscreen={onClickFullscreen}
          />
        )}
        <div
          className='overlay-video'
          onClick={() => setState({ isPlay: !states.isPlay })}
        >
          {!states.isPlay && (
            <img
              alt={'play-center'}
              src={playCenter}
              style={{
                width: isDesktop ? 120 : 60,
                height: isDesktop ? 120 : 60,
              }}
            />
          )}
        </div>
      </FullScreen>
    </div>
  );
};
