import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/styles/hljs';

const SuggestedValue = ({...props }) => (
  <SyntaxHighlighter language='javascript' style={githubGist}>
    {`POST ${props.url}

  toEmailId = '< ${props.toEmailId} >',

  ccEmailId = '< ${props.ccEmailId} > ',

  bccEmailId = '< ${props.bccEmailId} >',

  subject = '${props.subject}',

  body = '${props.body}'`}
  </SyntaxHighlighter>
)

export default SuggestedValue;