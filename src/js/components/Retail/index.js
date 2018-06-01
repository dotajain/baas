import React, { Component } from 'react';
import _ from 'lodash';
import { NavLink, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
// custom Component
import SynBankLogo from './partial/SynBankLogo';
import MyAccount from './MyAccount';
import FundTransfer from './FundTransfer';
import ConfirmTransfer from './ConfirmTransfer';
import ThankYou from './ThankYou';

import { connect } from "react-redux";


// Text to Speech

import { wtts, sendConversationIntent } from "../../redux/actions/watsonAction";
import ChatBot from './partial/ChatBot';

// conversation api
import watson from 'watson-developer-cloud';


//Speech To text
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';



@connect((store) => {
  return {
    data: store.retailReducer.data,
    err: store.retailReducer.err.error,
    fetching: store.retailReducer.fetching,
    confirmTransfer: store.retailReducer.confirmTransfer,
    thankYou: store.retailReducer.thankYou,
    
    ttsAudio: store.wtts.data,
    isAudioEnable: store.wtts.ttsAudio,
    ttsFetching: store.wtts.fetching,
    ttsFetched: store.wtts.fetched,
    sttData: store.wtts.convoIntent
  };
})

class Retail extends Component {
  constructor() {
    super();
    // Text to Speech API Actions;
    this._getAudioStream = this._getAudioStream.bind(this);
    this._onAudioStart = this._onAudioStart.bind(this);
    
    // Conversatio API Actions;
    this._fetchConversationToken = this._fetchConversationToken.bind(this);


    // Speech To Text API Actions;
    this.reset = this.reset.bind(this);
    this.captureSettings = this.captureSettings.bind(this);
    this.stopTranscription = this.stopTranscription.bind(this);
    this.getRecognizeOptions = this.getRecognizeOptions.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.handleTranscriptEnd = this.handleTranscriptEnd.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.getKeywords = this.getKeywords.bind(this);
    this.getKeywordsArr = this.getKeywordsArr.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);
    this.handleError = this.handleError.bind(this);


    this.state = {
      // Text to Speech api Initial State;
      audioText: 'Hello, I am your financial advisor How can i help you?',
      audioUrl: '',
      audioType: 'audio/ogg;codecs=opus',
      
      showPageItem: '',

      // Speech To Text api Initial State;
      model: 'en-US_BroadbandModel',
      formattedMessages: [],
      audioSource: '',
      speakerLabels: false,
      keywords: this.getKeywords(keywordsModal),
      settingsAtStreamStart: {
        model: '',
        keywords: [],
        speakerLabels: false
      },
      error: '',

      sttRecording: false,
      sttStream: '',

      loading: false,
      listening: false
    }
  }

  // fetch Speech To Text audio Stream. 
  _getAudioStream() {
    const text = encodeURIComponent(this.state.audioText);
    const ttsUrl = "https://text-to-speech-demo.mybluemix.net/api/synthesize?voice=en-US_AllisonVoice&text=" + text;
    this.props.dispatch(wtts(ttsUrl));
    this.setState({ loading: true });
    console.log('==== Step 1 ====');
  }

  // Start Speech to Text audio.  
  _onAudioStart(response) {

    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      this.setState({ audioUrl: url, loading: false }, () => {
        console.log('==== Step 3 ====');
        const audio = document.querySelector('audio#audio');
        setTimeout(() => {
          const duration = (audio.duration) * 1000;
          setTimeout(() => this.handleMicClick(), duration);
        }, 500);

      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ttsAudio.ok && nextProps.isAudioEnable) {
      console.log('==== Step 2 ====');
      this._onAudioStart(nextProps.ttsAudio);
    }
    
    if (nextProps.sttData) {
      if (nextProps.sttData.data.isSpeaker) {
        setTimeout(() => {
          this._fetchConversationToken(nextProps.sttData.data.message);
        }, 5000);
      } else {
        this.stopTranscription();
      }      
    }
  }

// ===================END Speech To Text ======

  // Fetch conversation api.
  _fetchConversationToken(message) {
    console.log('==== Step 8 ====');
    this.stopTranscription();

    let conversation =  watson.conversation({
      username: '40c909d6-97c9-4818-9f8b-f87d4b05bd19',
      password: 'qe3EyyEav6mQ',
      version: 'v1',
      version_date: '2017-04-21'
    });    
    
    var context = {};
    conversation.message({
      workspace_id: 'a3c8a706-3be9-4eaf-99c6-9f48dcf827b6',
      input: {'text': message},
      context: context
    }, (err, response) => {
      if (err){
        console.log('error:', err);
      } else {
        let conversationOutputText;
        conversationOutputText = response.output.text[0];
        const conversationNodeVisited = response.output.nodes_visited[0];
        
        const sab = 'savingsAccountBalance';
        const sat = 'savingAccountTransaction';
        const cab = 'currentAccountBalance';
        const cat = 'currentAccountTransaction';
        const ccb = 'creditCardBalance';
        const cct = 'creditCardTransaction';

        if (conversationNodeVisited === sab) {
          conversationOutputText += _.map(accountDetail, item => item.accountName === 'Savings Account' ? ` ${item.balance}` : '');
        } else if (conversationNodeVisited === cab) {
          conversationOutputText += _.map(accountDetail, item => item.accountName === 'Current Account' ? ` ${item.balance}` : '');
        } else if (conversationNodeVisited === ccb) {
          conversationOutputText += _.map(accountDetail, item => item.accountName === 'Credit Card Account' ? ` ${item.balance}` : '');
        }

        this.setState({ audioText: conversationOutputText, showPageItem: conversationNodeVisited }, () => {
          console.log('==== Step 9 ====');
          this._getAudioStream();
          const page = this.state.showPageItem;
          if (page === sab || page === sat || page === cab  || page === cat || page === ccb || page === cct) {
            this.props.history.push('/my-account');
          }
        });
      }
    });
  }
  // ===================END conversation Api ======



  // Speech to Text API. 

  reset() {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
    this.setState({formattedMessages: [], error: null});
  }

  captureSettings() {
    this.setState({
      settingsAtStreamStart: {
        model: this.state.model,
        keywords: this.getKeywordsArr(),
        speakerLabels: this.state.speakerLabels
      }
    });
  }

  stopTranscription() {
    console.log('stop audio');
    this.stream && this.stream.stop();
    this.setState({audioSource: null, listening: false});
  }

  getRecognizeOptions(extra) {
    var keywords = this.getKeywordsArr();
    return Object.assign({
      token: this.state.token, smart_formatting: true, // formats phone numbers, currency, etc. (server-side)
      continuous: false,                  // False = automatically stop transcription the first time a pause is detected
      inactivity_timeout: 5,              // Number of seconds to wait before closing input stream
      format: false, // adds capitals, periods, and a few other things (client-side)
      model: this.state.model,
      objectMode: true,
      interim_results: true,
      continuous: true,
      word_alternatives_threshold: 0.01, // note: in normal usage, you'd probably set this a bit higher
      keywords: keywords,
      keywords_threshold: keywords.length
        ? 0.01
        : undefined, // note: in normal usage, you'd probably set this a bit higher
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
      speaker_labels: this.state.speakerLabels, // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
      resultsBySpeaker: this.state.speakerLabels, // combines speaker_labels and results together into single objects, making for easier transcript outputting
      speakerlessInterim: this.state.speakerLabels // allow interim results through before the speaker has been determined
    }, extra);
  }

  handleMicClick() {
    console.log('mic clicked');
    console.log('==== Step 4 ====');
    if (this.state.audioSource === 'mic') {
      return this.stopTranscription();
    }
    this.reset();
    this.setState({audioSource: 'mic', audioUrl: '', listening: true });

    this.handleStream(recognizeMicrophone(this.getRecognizeOptions()));
  }
  
  handleStream(stream) {
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;
    this.captureSettings();

     stream.on('data', (data) => {
      console.log('==== Step 5 ====');
      if (data.result_index === 0 && data.results[0].final) {
        
        this.handleFormattedMessage(data);
      }

    }).on('end', this.handleTranscriptEnd).on('error', this.handleError);

    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

  }

  handleFormattedMessage(msg) {
    this.setState({ listening: false });
    if (msg) {
      this.setState({formattedMessages: this.state.formattedMessages.concat(msg)}, () => {
        this.getFinalAndLatestInterimResult(true);
      });
    } else {
      this.getFinalAndLatestInterimResult(false);
    }
  }

  handleTranscriptEnd() {
    this.setState({audioSource: null, listening: false});
  }

  componentDidMount() {
    this.fetchToken();    
  }

  fetchToken() {
    return fetch('https://speech-to-text-demo.mybluemix.net/api/token').then(res => {
      if (res.status != 200) {
        throw new Error('Error retrieving auth token');
      }
      return res.text();
    }).
    then(token => this.setState({token})).catch(this.handleError);
  }

  getKeywords(model) {
    const files = model;
    return files && files.length >= 2 && files[0].keywords + ', ' + files[1].keywords || '';
  }

 
  getKeywordsArr() {
    return this.state.keywords.split(',').map(k => k.trim()).filter(k => k);
  }

  getFinalResults() {
    return this.state.formattedMessages.filter(r => r.results && r.results.length && r.results[0].final);
  }

  getCurrentInterimResult() {
    const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];
    if (!r || !r.results || !r.results.length || r.results[0].final) {
      return null;
    }
    return r;
  }

  getFinalAndLatestInterimResult(isSpeaker) {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    const messageArray = _.map(final, msg => _.map(msg.results, result => result.alternatives[0].transcript ));
    const concatMessage = _.reduce(messageArray, (a, b) => a.concat(b), []);
    const message = _.join(concatMessage, '');
    const data = {
      message: message,
      isSpeaker: isSpeaker
    }
    this.props.dispatch(sendConversationIntent({data}));
    console.log('==== Step 7 ====');
    this.setState({ loading: true });
  }

  handleError(err, extra) {
    console.error(err, extra);
    this.setState({ error: err.message, listening: false });
  }


  render() {
    const { match, dispatch, confirmTransfer, data, thankYou, ttsFetched, ttsFetching } = this.props;
    let page;

    if (match.params.id === '1') {
      if (confirmTransfer) {
        page = <ConfirmTransfer data={data} dispatch={dispatch}/>;
      } else if (thankYou){
        page = <ThankYou data={data} dispatch={dispatch} />;
      } else {
        page = <FundTransfer accounts={accountDetail} dispatch={dispatch} />;
      }
    } else {
      page = <MyAccount accounts={accountDetail} showPageItem={this.state.showPageItem} dispatch={dispatch} />;
    }
    
    return (
      <div className="retail">
        <header className="retail-header">
          <SynBankLogo />
          <div className="retail-header-nav">
             <nav className="navbar navbar-toggleable-md navbar-primary ">  
              <div className="navbar-main">
                <ul className="navbar-nav justify-content-between">
                  <li className="nav-item"><NavLink exact to="/my-account" className="nav-link" activeClassName="selected">My Account</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/1" className="nav-link" activeClassName="selected">Fund Transfer</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/2" className="nav-link" activeClassName="selected">Detail Statement</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/3" className="nav-link" activeClassName="selected">Bill Payment</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/4" className="nav-link" activeClassName="selected">Offers</NavLink></li>
                  <li className="nav-item"><NavLink to="/retail-digital-banking" className="nav-link" activeClassName="selected">Logout</NavLink></li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="retail-wrapper">
          <aside className="retail-side-nav">
            <nav className="navbar navbar-primary ">  
              <div className="navbar-main">
                <ul className="navbar-nav">
                  <li className="nav-item"><NavLink exact to="/my-account" className="nav-link" activeClassName="selected">My Account</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/1" className="nav-link" activeClassName="selected">Fund Transfer</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/2" className="nav-link" activeClassName="selected">Detail Statement</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/3" className="nav-link" activeClassName="selected">Bill Payment</NavLink></li>
                  <li className="nav-item"><NavLink to="/my-account/4" className="nav-link" activeClassName="selected">Offers</NavLink></li>
                  <li className="nav-item"><NavLink to="/retail-digital-banking" className="nav-link" activeClassName="selected">Logout</NavLink></li>
                </ul>
              </div>
            </nav>
          </aside>
          <div className="retail-container">
            {page}
          </div>
        </div>
        <button onClick={this._fetchConversationToken}>conversation</button>
        
        <ChatBot
          ttsFetching={ttsFetching}
          ttsFetched={ttsFetched}
          audioUrl={this.state.audioUrl}
          audioText={this.state.audioText}
          getAudioStream={this._getAudioStream}
          sttToken={this.state.token}
          audioSource={this.state.audioSource}
          isMicroPhoneSupported={this.state.sttRecording}
          handleMicClick={this.handleMicClick}
          speakerLabels={this.state.settingsAtStreamStart.speakerLabels}
          loading={this.state.loading}
          listening={this.state.listening}
        />

        

      </div>
    );
  }
}

const accountDetail = [
  {
    "accountName" : "Savings Account",
    "accountNumber": "367670070029169",
    "balance": "17,000.00",
    "transaction": [
      {
        "date": "18 Feb 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$1,410"
      },
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
      {
        "date": "18 Feb 2017",
        "title": "Transfer from Some user, user type, Bank Detais from 9281948819",
        "amount": "+$6,170"
      }
    ],
    "payee": [
      {
        "name": "Kees Kluskens",
        "accountNumber": "22446699",
        "bank": "Bank of America"
      },
      {
        "name": "Matt palmer",
        "accountNumber": "1728736217",
        "bank": "Citigroup"
      },
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      },
      {
        "name": "Alexander Kaiser",
        "accountNumber": "882688817",
        "bank": "Deutsche Bank"
      }
    ]
  },
  {
    "accountName" : "Current Account",
    "accountNumber": "367670070029169",
    "balance": "18,350.40",
    "transaction": [
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
      {
        "date": "18 Feb 2017",
        "title": "Transfer from Some user, user type, Bank Detais from 9281948819",
        "amount": "+$6,170"
      },
      {
        "date": "21 Mar 2017",
        "title": "Purchase Apples, Store for Daily item, Store Address, ATM withdrawl",
        "amount": "-$2,270"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$3,500"
      },
    ],
    "payee": [
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      },
      {
        "name": "Alexander Kaiser",
        "accountNumber": "882688817",
        "bank": "Deutsche Bank"
      }
    ]
  },
  {
    "accountName" : "Credit Card Account",
    "accountNumber": "367670070029169",
    "balance": "53,299.10",
    "transaction": [
      {
        "date": "18 Feb 2017",
        "title": "Gold MasterCard credit card",
        "amount": "-$410"
      },
      {
        "date": "21 Mar 2017",
        "title": "2 year fixed rate mortgage",
        "amount": "-$8,170"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$12,40"
      },
      {
        "date": "18 Feb 2017",
        "title": "Card 01, The Sports Shop",
        "amount": "-$1,170"
      },
      {
        "date": "21 Mar 2017",
        "title": "2 year fixed rate mortgage",
        "amount": "-$8,170"
      },
      {
        "date": "27 Mar 2017",
        "title": "Card 01, New Fashion Purchase",
        "amount": "-$12,40"
      },
    ],
    "payee": [
      {
        "name": "Kees Kluskens",
        "accountNumber": "22446699",
        "bank": "Bank of America"
      },
      {
        "name": "Matt palmer",
        "accountNumber": "1728736217",
        "bank": "Citigroup"
      },
      {
        "name": "Evan Scott",
        "accountNumber": "898281727",
        "bank": "Santander Bank"
      }
    ]
  }
];

const keywordsModal = [
  {
    "filename": "Us_English_Broadband_Sample_1.wav",
    "keywords": "sense of pride, watson, technology, changing the world",
    "speaker_labels": false
  },
  {
    "filename": "Us_English_Broadband_Sample_2.wav",
    "keywords": "round, whirling velocity, unwanted emotion",
    "speaker_labels": false
  }
];

export default Retail;