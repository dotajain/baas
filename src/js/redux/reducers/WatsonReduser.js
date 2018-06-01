import { actionTypes as types } from '../constants';

const initialState = {
  data: '',
  fetching: false,
  fetched: false,
  err: '',
  convoIntent: '',
  ttsAudio: ''
}

const wtts = (state = initialState, action) => {
  switch (action.type) {
    case types.TEXT_TO_SPEECH_REQUEST:
      return {...state, fetching: true, convoIntent: ''}
    case types.TEXT_TO_SPEECH_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.data,
          ttsAudio: true,
          convoIntent: ''
        }
    case types.SERVICE_ERROR:
      return {...state, fetching: false, fetched: false, err: action.data, convoIntent: ''}
    
    case types.SEND_CONVERSATION_INTENT:
      return {...state, convoIntent: action.data, ttsAudio: false}
    default:
      return state
  }
}

export default wtts;