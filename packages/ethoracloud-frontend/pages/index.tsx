import { useState } from 'react';
import { Poppins } from 'next/font/google'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppDetails from '@/app/components/AppDetails';
import AppMock from '@/app/components/AppMock';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })


export default function Home() {
  const [appTitle, setAppTitle] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [loginScreenBackground, setLoginScreenBackground] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinName, setCoinName] = useState('');

  const handleLogoChange = (event: any) => {
    setLogo(event.target.files[0]);
  }

  const handleLoginScreenBackgroundChange = (event: any) => {
    setLoginScreenBackground(event.target.files[0]);
  }

  return (
    <main className={poppins.className}>
      <Head>
        <title>Ethora Cloud</title>
      </Head>
      <div className={styles.container}>
        <AppDetails
          appTitle={appTitle}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          coinSymbol={coinSymbol}
          coinName={coinName}
          setAppTitle={setAppTitle}
          handleLogoChange={handleLogoChange}
          handleLoginScreenBackgroundChange={handleLoginScreenBackgroundChange}
          setPrimaryColor={setPrimaryColor}
          setSecondaryColor={setSecondaryColor}
          setCoinSymbol={setCoinSymbol}
          setCoinName={setCoinName}
        />
        <AppMock
          appTitle={appTitle}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          logo={logo}
          loginScreenBackground={loginScreenBackground}
          coinSymbol={coinSymbol}
          coinName={coinName}
        />
      </div>
    </main>
  )
}