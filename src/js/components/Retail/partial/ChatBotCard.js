
import React from 'react';
import advisorThumb from '../../../../assets/images/advisor_image.gif';


const ChatBotCard = ({...props}) => (
  <div className="chatbot-card">
    <div className="chatbot-card-body">
      <h3 className="chatbot-title">{props.audioText}</h3>
    </div>
  </div>
);

export default ChatBotCard;