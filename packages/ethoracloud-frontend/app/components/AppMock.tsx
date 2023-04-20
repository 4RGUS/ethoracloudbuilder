import React from 'react';
import styles from '../../styles/AppMock.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import { TCustomDetails } from './AppDetails';
import Image from 'next/image';

interface TAppMock extends TCustomDetails {
    logo: File | null
    loginScreenBackground: File | null
}

export default function AppMock(props: TAppMock) {
    const {
        appTitle,
        primaryColor,
        secondaryColor,
        coinSymbol,
        coinName,
        logo,
        loginScreenBackground
    } = props;
    return (
        <div className={styles.rightSection}>
            <div className={styles.iphoneScreen}>
                <div className={styles.statusBar}>
                    <div className={styles.statusbar__left}>
                        <h5>2:20</h5>
                    </div>
                    <div className={styles.statusbar__right}>
                        <FontAwesomeIcon className={styles.batteryIcon} icon={faBatteryHalf} />
                    </div>
                </div>
                <div className={styles.appScreen}>
                    <h1>{appTitle}</h1>
                    {logo && <Image src={URL.createObjectURL(logo)} alt="Logo" width={100} height={100} />}
                    {loginScreenBackground && <Image src={URL.createObjectURL(loginScreenBackground)} alt="Login Screen Background" width={200} height={400} />}
                    <div className={styles.primaryColor} style={{ backgroundColor: primaryColor }}>Primary Color</div>
                    <div className={styles.secondaryColor} style={{ backgroundColor: secondaryColor }}>Secondary Color</div>
                    <div className={styles.coinInfo}>
                        <div className={styles.coinSymbol}>{coinSymbol}</div>
                        <div className={styles.coinName}>{coinName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}