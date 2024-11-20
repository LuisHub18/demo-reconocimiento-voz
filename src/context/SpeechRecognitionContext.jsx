// SpeechContext.js
import React, { createContext, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


  if(!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <SpeechContext.Provider value={{transcript, resetTranscript, SpeechRecognition }}>
      {children}
    </SpeechContext.Provider>
  );
};