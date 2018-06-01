import React, { Component } from 'react';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import {Transcript} from './transcript';

class SpeechToText extends Component {

  constructor() {
    super();

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
      isNarrowBandmodel: 'en-US_BroadbandModel',
      formattedMessages: [],
      audioSource: '',
      speakerLabels: false,
      keywords: this.getKeywords(keywordsModal),
      settingsAtStreamStart: {
        model: '',
        keywords: [],
        speakerLabels: false
      },
      error: ''
    }
  }

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
    this.stream && this.stream.stop();
    this.setState({audioSource: null});
  }

  getRecognizeOptions(extra) {
    var keywords = this.getKeywordsArr();
    return Object.assign({
      token: this.state.token, smart_formatting: true, // formats phone numbers, currency, etc. (server-side)
      format: true, // adds capitals, periods, and a few other things (client-side)
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
    if (this.state.audioSource === 'mic') {
      return this.stopTranscription();
    }
    this.reset();
    this.setState({audioSource: 'mic'});
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

    
    stream.on('data', this.handleFormattedMessage).on('end', this.handleTranscriptEnd).on('error', this.handleError);

    
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

    
    
  }

  handleFormattedMessage(msg) {
    this.setState({formattedMessages: this.state.formattedMessages.concat(msg)});
  }

  handleTranscriptEnd() {
    this.setState({audioSource: null});
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

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    } 
    return final;
  }

  handleError(err, extra) {
    console.error(err, extra);
    this.setState({ error: err.message });
  }

  render() {

    const buttonsEnabled = !!this.state.token;
    const buttonClass = buttonsEnabled
      ? 'base--button'
      : 'base--button base--button_black';

    let micIconFill = '#000000';
    let micButtonClass = buttonClass;
    if (this.state.audioSource === 'mic') {
      micButtonClass += ' mic-active';
      micIconFill = '#FFFFFF';
    } else if (!recognizeMicrophone.isSupported) {
      micButtonClass += ' base--button_black';
    }

    const err = this.state.error ? ( <p className="base--p">{this.state.error}</p>) : '';

    const messages = this.getFinalAndLatestInterimResult();
    console.log(messages);
    return (
      
      <div>
        <button className={micButtonClass} onClick={this.handleMicClick}>
          <span> {this.state.audioSource === 'mic' ? 'stop' : 'microphone'} {micIconFill} </span> Record Audio
        </button>

        {err}

        {this.state.settingsAtStreamStart.speakerLabels
          ? 'Speech to text not supporting'
          : <Transcript messages={messages}/>}

      </div>
    );
  }
};


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

export default SpeechToText;