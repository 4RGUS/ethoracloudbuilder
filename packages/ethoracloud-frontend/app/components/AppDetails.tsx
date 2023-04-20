import React from 'react';
import styles from '../../styles/AppDetails.module.css';

export interface TCustomDetails{
    appTitle: string
    primaryColor:string
    secondaryColor:string
    coinSymbol:string
    coinName:string
}

interface TAppDetails extends TCustomDetails{
    setAppTitle: (value: string) => void
    handleLogoChange: (event: any) => void
    handleLoginScreenBackgroundChange: (event: any) => void
    setPrimaryColor: (value: string) => void
    setSecondaryColor: (value: string) => void
    setCoinSymbol: (value: string) => void
    setCoinName: (value: string) => void
}

export default function AppDetails(props:TAppDetails){

    const {
        appTitle,
        primaryColor,
        secondaryColor,
        coinSymbol,
        coinName,
        setAppTitle,
        handleLogoChange,
        handleLoginScreenBackgroundChange,
        setPrimaryColor,
        setSecondaryColor,
        setCoinSymbol,
        setCoinName
    } = props

    return(
    <div className={styles.leftSection}>
        <h2>Customize Your App</h2>
        <label>
          App Title:
          <input className={styles.input} type="text" value={appTitle} onChange={(event) => setAppTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Logo:
          <input className={styles.input} type="file" onChange={handleLogoChange} />
        </label>
        <br />
        <label>
          Login Screen Background Image:
          <input className={styles.input} type="file" onChange={handleLoginScreenBackgroundChange} />
        </label>
        <br />
        <label>
          Primary Color:
          <input className={styles.input} type="text" value={primaryColor} onChange={(event) => setPrimaryColor(event.target.value)} />
        </label>
        <br />
        <label>
          Secondary Color:
          <input className={styles.input} type="text" value={secondaryColor} onChange={(event) => setSecondaryColor(event.target.value)} />
        </label>
        <br />
        <label>
          Coin Symbol:
          <input className={styles.input} type="text" value={coinSymbol} onChange={(event) => setCoinSymbol(event.target.value)} />
        </label>
        <br />
        <label>
          Coin Name:
          <input className={styles.input} type="text" value={coinName} onChange={(event) => setCoinName(event.target.value)} />
        </label>
      </div>
    )
}