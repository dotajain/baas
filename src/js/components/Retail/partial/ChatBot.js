import React from 'react';
import ChatBotCard from './ChatBotCard';

// speech to text
import {Transcript} from './transcript';

const ChatBot = ({...props}) => {
  
  let chatBotCard, playAudio, isAudioAvailable;
  
  if (props.ttsFetching) {
    isAudioAvailable = 'fetching';
  } else if (props.ttsFetched) {
    isAudioAvailable =  'fetched';
    if (props.audioSource === 'mic') {
      isAudioAvailable = 'fetched mic-active';
    }
  }

  if (props.audioUrl) {
    chatBotCard = <ChatBotCard audioText={props.audioText}/>
    playAudio = (<audio className="chatbot-audio" autoPlay="true" id="audio" controls="controls" src={props.audioUrl}>
                    Your browser does not support the audio element.
                  </audio>);
  }

// Speech to text render dependencies
  // const messages = props.messages;
  // console.log(messages);


  let icon;
  if (props.loading) {
    icon = (<div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>);
  } else if (props.listening){
    icon = (<div class="spinner-listening">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>);
  } else {
    icon = (<i className="fa fa-microphone"></i>);
  }

  return (
    <div className="chatbot">

        {
          //<button className={micButtonClass} onClick={props.handleMicClick}>
          //<span> {props.audioSource === 'mic' ? 'stop' : 'microphone'} {micIconFill} </span> Record Audio
          //</button>
       


        //props.speakerLabels
          //? 'Speech to text not supporting'
          //: <Transcript messages={messages}/>
          }


      {chatBotCard}
      <button className={`chatbot-button ${isAudioAvailable}`} onClick={props.getAudioStream}>
        <svg id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
          <g>
            <path className="st0" d="M103.8,77.2c2.5-2,5.2-3.9,7.8-5.7 M134.5,58.1c1.6-0.8,3.2-1.6,4.9-2.3c22.3-10.2,45.7-16.1,70.2-17.3   c1,0,1.9-0.4,2.9-0.6c6,0,11.9,0,17.9,0c4.1,0.6,8.1,1.1,12.2,1.7c2.9,0.4,5.7,0.9,8.6,1.5 M271.9,46.4c16.1,5.3,31.1,13,44.9,22.9    M338.8,87.8c0.6,0.6,1.2,1.2,1.8,1.7 M362.9,117.3c8.3,13.2,14.6,27.5,18.7,43.2c4.9,19,5,38.2,2,57.5   c-4.3,27.1-14.3,51.1-30.2,71.7 M335.7,308.8c-1.9,1.7-3.8,3.5-5.8,5.2c-20,16.9-43.1,27.6-68.6,33.3c-21.2,4.8-42.5,4.8-64,3   c-6.2-0.5-12.4-1.5-18.6-1.9c-1.9-0.1-4.2,0.6-5.9,1.6c-23,13.2-46,26.5-68.9,39.8c-1.3,0.8-2.7,1.5-4.5,2.5   c-0.1-1.9-0.2-3.4-0.2-4.8c0-22.7-0.1-45.5,0.1-68.2c0-3-0.9-4.9-3.1-6.9c-31.1-27.9-47.3-63-50.9-104.5   c-3.3-37.6,6.7-71.2,29.3-101c3.3-4.4,6.8-8.5,10.5-12.5"/><path className="st0" d="M438.7,293.9"/><path className="st0" d="M424.4,173.8c13.8,14.3,24.8,30,32.2,47.4"/><path className="st0" d="M463.4,241.9c0.4,1.6,0.8,3.3,1.1,4.9"/><path className="st0" d="M467.4,272c0.6,26-6,50.5-19.5,73.5c-11.5,19.7-26.8,35.9-45.4,49.1c-2.5,1.8-3.4,3.6-3.4,6.6   c0.1,22.6,0.1,45.2,0.1,67.8c0,1.5,0,3.1,0,5.2c-1.8-1-3.2-1.7-4.4-2.4c-22.7-14-45.5-27.9-68.1-42c-2.8-1.8-5.5-2.2-8.8-1.8   c-26.3,3.7-52.3,3-77.6-5.2"/><path className="st0" d="M217.6,413c-16.7-8.9-31.4-20.8-45.4-34.5"/>
          </g>
        </svg>
        {icon}
      </button>
      {playAudio}
    </div>
  )
};

export default ChatBot;