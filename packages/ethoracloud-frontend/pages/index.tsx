import { useState } from 'react';
import { Poppins } from 'next/font/google'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppDetails from '@/app/components/AppDetails';
import AppMock from '@/app/components/AppMock/AppMock';
import { ActionStrip } from '@/app/components/ActionStrip';

//interfaces
export interface TCustomDetails {
  appTitle: string
  primaryColor: string
  secondaryColor: string
  coinSymbol: string
  coinName: string
  currentScreenIndex: number
  logo: File | null
  loginScreenBackground: File | null
  coinLogo: File | null
}

//font
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700', '900'] })


const screenSet = [{ screenName: "login", index: 0 }, { screenName: "profile", index: 1 }]

export default function Home() {
  const [appTitle, setAppTitle] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [loginScreenBackground, setLoginScreenBackground] = useState<File | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string>('');
  const [secondaryColor, setSecondaryColor] = useState<string>('');
  const [coinLogo, setCoinLogo] = useState<File | null>(null);
  const [coinSymbol, setCoinSymbol] = useState<string>('');
  const [coinName, setCoinName] = useState<string>('');
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);


  //handle to set logo file
  const handleLogoChange = (event: any) => {
    setAppTitle('')
    setLogo(event.target.files[0]);
  }

  //handle to set app title
  const handleAppTitle = (value: string) => {
    setLogo(null);
    setAppTitle(value);
  }

  //handle to set login screen background
  const handleLoginScreenBackgroundChange = (event: any) => {
    setLoginScreenBackground(event.target.files[0]);
  }

  //handle to set coin image
  const handleCoinLogoChange = (event: any) => {
    setCoinLogo(event.target.files[0]);
  }


  //handle for previous button in action strip
  const handlePrevClick = () => {
    setCurrentScreenIndex(currentScreenIndex - 1);
  }

  //handle for next button in action strip
  const handleNextClick = () => {
    setCurrentScreenIndex(currentScreenIndex + 1);
  }

  //handle to clear data 
  const handleClear = (screenIndex: number) => {
    if (screenIndex === 0) {
      setAppTitle("");
      setLogo(null);
      setLoginScreenBackground(null);
    }

    if (screenIndex === 1) {
      setPrimaryColor("");
      setSecondaryColor("");
      setCoinName("");
      setCoinSymbol("");
      setCoinLogo(null);
    }
  }

  //handle to submit data
  const handleSubmit = () => {

    const data = new FormData();
    data.append('appTitle', appTitle);
    data.append('primaryColor', primaryColor);
    data.append('secondaryColor', secondaryColor);
    data.append('coinSymbol', coinSymbol);
    data.append('coinLogo', coinLogo as Blob);
    data.append('logo', logo as Blob);
    data.append('loginScreenBackground', loginScreenBackground as Blob);


    console.log(data.get('logo'));

  }

  return (
    <main className={poppins.className}>
      <Head>
        <title>Ethora Cloud</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <AppDetails
            appTitle={appTitle}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            coinSymbol={coinSymbol}
            coinName={coinName}
            setAppTitle={handleAppTitle}
            handleLogoChange={handleLogoChange}
            handleLoginScreenBackgroundChange={handleLoginScreenBackgroundChange}
            setPrimaryColor={setPrimaryColor}
            setSecondaryColor={setSecondaryColor}
            handleCoinLogoChange={handleCoinLogoChange}
            setCoinSymbol={setCoinSymbol}
            setCoinName={setCoinName}
            currentScreenIndex={currentScreenIndex}
            logo={logo}
            loginScreenBackground={loginScreenBackground}
            coinLogo={coinLogo}
            handleClear={handleClear}
          />
          <AppMock
            appTitle={appTitle}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            logo={logo}
            loginScreenBackground={loginScreenBackground}
            coinLogo={coinLogo}
            coinSymbol={coinSymbol}
            coinName={coinName}
            currentScreenIndex={currentScreenIndex}
          />
        </div>

        <ActionStrip
          currentScreenIndex={currentScreenIndex}
          screenSet={screenSet}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  )
}