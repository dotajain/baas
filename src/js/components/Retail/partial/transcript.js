import React from 'react';

export function Transcript(props) {
  try {

    const results = props.messages.map(msg => {
      return msg.results.map((result, i) => (
        <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
      ));
    }).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array
    return (
      <div>
        {results}
      </div>
    );
  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}