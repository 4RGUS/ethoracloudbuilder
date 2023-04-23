import React from 'react';
import styles from '../../styles/AppDetails.module.css';
import { TCustomDetails } from '@/pages';

//interfaces
interface TAppDetails extends TCustomDetails {
  setAppTitle: (value: string) => void
  handleLogoChange: (event: any) => void
  handleLoginScreenBackgroundChange: (event: any) => void
  setPrimaryColor: (value: string) => void
  setSecondaryColor: (value: string) => void
  handleCoinLogoChange: (event: any) => void
  setCoinSymbol: (value: string) => void
  setCoinName: (value: string) => void
  handleClear: (screenIndex: number) => void
}

export default function AppDetails(props: TAppDetails) {

  const {
    appTitle,
    primaryColor,
    secondaryColor,
    coinSymbol,
    coinName,
    currentScreenIndex,
    setAppTitle,
    handleLogoChange,
    handleLoginScreenBackgroundChange,
    setPrimaryColor,
    setSecondaryColor,
    handleCoinLogoChange,
    setCoinSymbol,
    setCoinName,
    handleClear
  } = props;


  //handle to clear form data for a given screen
  const ClearButton = (props: { screenIndex: number }) => {
    return (
      <>
        <button onClick={() => handleClear(props.screenIndex)} className='clearButton'>Clear</button>
        <style jsx>
          {
            `
            .clearButton {
              margin-left: 10px;
              color: #090909;
              padding: 0.7em 1.7em;
              font-size: 18px;
              border-radius: 0.5em;
              background: #e8e8e8;
              border: 1px solid #e8e8e8;
              transition: all .3s;
              box-shadow: 6px 6px 12px #c5c5c5,
                         -6px -6px 12px #ffffff;
            }
            
            .clearButton:hover {
              border: 1px solid #2775EA;
            }
            
            .clearButton:active {
              box-shadow: 4px 4px 12px #c5c5c5,
                         -4px -4px 12px #ffffff;
            }
            `
          }
        </style>
      </>
    )
  }

  //Component for displaying form in the first screen
  const screen0 = () => {
    return (
      <>
        <label className={styles.label}>
          App Title:
          <input className={styles.textInput} placeholder='My App' type="text" value={appTitle} onChange={(event) => setAppTitle(event.target.value)} />
        </label>
        <br />
        <label className={styles.label}>
          Logo:
          <input accept='.png' className={styles.input} type="file" onChange={handleLogoChange} />
        </label>
        <br />
        <label className={styles.label}>
          Login Screen Background Image:
          <input accept='.png' className={styles.input} type="file" onChange={handleLoginScreenBackgroundChange} />
        </label>
        <br />
        <ClearButton screenIndex={0} />
      </>
    )
  }

  //Component for displaying form in the second screen
  const screen1 = () => {
    return (
      <>
        <div className='dualSet'>
          <label className={styles.label}>
            Primary Color
            <input className={styles.textInput} type="text" placeholder='#003E9C' value={primaryColor} onChange={(event) => setPrimaryColor(event.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Secondary Color
            <input className={styles.textInput} type="text" placeholder='#2775EA' value={secondaryColor} onChange={(event) => setSecondaryColor(event.target.value)} />
          </label>
        </div>
        <br />
        <div className='dualSet'>
          <label className={styles.label}>
            Coin Symbol
            <input className={styles.textInput} type="text" placeholder='ETO' value={coinSymbol} onChange={(event) => setCoinSymbol(event.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Coin Name
            <input className={styles.textInput} type="text" placeholder='Ethora Coin' value={coinName} onChange={(event) => setCoinName(event.target.value)} />
          </label>
        </div>
        <br />
        <div className='dualSet'>
          <label className={styles.label}>
            Coin logo
            <input accept='.png' className={styles.input} type="file" onChange={handleCoinLogoChange} />
          </label>
          <div>

          </div>
        </div>
        <style jsx>
          {
            `
            .dualSet{
              width:100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
            }
            `
          }
        </style>
        <br />
        <ClearButton screenIndex={1} />
      </>
    )
  }

  return (
    <div className={"leftSection"}>
      <h1 className='h1'>Customize Your App</h1>
      <div className="detailsSection">
        {currentScreenIndex === 0 ? screen0() : null}
        {currentScreenIndex === 1 ? screen1() : null}
      </div>
      <style jsx>
        {
          `
          .h1{
            flex-basis:30%;
            font-size:48px;
            display: flex;
            align-items:flex-end;
            color: #2775EA;
          }
          .leftSection {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            background-color: #EDEDED;
            background: linear-gradient(315deg, #ffffff, #e6e6e6);
            color: #000;
            padding:20px;
            padding-left:50px;
          }
          .detailsSection{
            flex-basis: 70%;
            display:flex;
            flex-direction: column;
            align-items: flex-start;
          }
          @media (max-width: 768px) {

            .leftSection {
                width: 100%;
            }
          }
          `
        }
      </style>
    </div>
  )
}