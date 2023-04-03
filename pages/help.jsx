import React from 'react';
import Opti from '../components/Opti/Opti';
import Head from 'next/head';

export default function help() {
  return (
    <div className="sendHelp">
      <Head>
        <title>Optim8 | Help</title>
      </Head>
      <h1 className="help">HELP IS ON THE WAY</h1>
      <br></br>
      <br></br>
      <br></br>
      <Opti />
    </div>
  );
}
