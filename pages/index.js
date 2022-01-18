import {useEffect, useState} from 'react';
import { useWeb3React } from "@web3-react/core"
import {formatEther} from '@ethersproject/units';
import Head from 'next/head'
import Image from "next/image";
import { injected } from '../utils/injector';
import useWallet from '../hooks/useWallets';

import styles from '../styles/Home.module.scss'

export default function Home() {
  const { activate, account, library } = useWeb3React();
  const {loaded: isLoaded} = useWallet();
  const [balance, setBalance] = useState(0);

  async function connect() {
      try {
          if (window.ethereum) {
              await activate(injected);
          } else {
              window.open('https://metamask.io/download.html');
          }
      } catch (ex) {
          console.log(ex)
      }
  }

  function start_and_end(str) {
    if (!str) return;
    if (str.length > 16) {
      return str.substr(0, 6) + '...' + str.substr(str.length-4, str.length);
    }
    return str;
  }

  const renderButton = () => {
      if (!isLoaded) {
          return (
            <button
            className='bg-white px-4 py-2 font-semibold text-sm text-black rounded-full shadow-sm'
              onClick={connect}
            >Connect to Metamask</button>
          )
      } else {
          return (
            <button
              className='bg-white px-4 py-2 font-semibold text-sm text-black rounded-full shadow-sm'
              onClick={connect}
            >{start_and_end(account)}</button>
          )
      }
  }

  const getBalance = async () => {
    const data = await library?.eth.getBalance(account);
    data && setBalance(parseFloat(formatEther(data)).toPrecision(4));
  }

  useEffect(() => {
    getBalance();
  }, [library, account]);

  getBalance();

  const renderMintButton = () => {
    if (!isLoaded) {
        return (
          <button
          className='bg-white px-4 py-2 font-semibold text-sm text-black rounded-full shadow-sm'
            onClick={connect}
          >Connect to Metamask</button>
        )
    } else {
        return (<button className={styles.mint_button}>Mint</button>);
    }
  }

  return (
    <>
      <Head>
        <title>DigitalSisterhoodNFT</title>
        <meta name="description" content="DigitalSisterhood NFT collection of 10,000 NFTS that celebrate Muslim Woman from all walks of life." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image className={styles.logo_image} src={require('../images/logo.png')} width={80} height={80} alt='TDS' />
          <span className={styles.logo_text}>TheDigitalSisterhoodNFT</span>
        </div>
        <ul className={styles.actions}>
          <li>
            <a href="https://www.instagram.com/thedigitalsisterhood/" target='_blank' rel='noreferrer'>
              <Image
                className={styles.logo_image}
                src={require('../images/ig.png')}
                width={28} height={28} 
                layout="fixed" alt='Instagram'
              />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/eV2vpHZz" target='_blank' rel='noreferrer'>
              <Image
                className={styles.logo_image}
                src={require('../images/discord-logo-white.png')}
                width={34} height={38} 
                layout="fixed" alt='Discord'
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/digitalsisNFT" target='_blank' rel='noreferrer'>
              <Image
                className={styles.logo_image}
                src={require('../images/twitter-logo-white.png')}
                width={32} height={26} 
                layout="fixed" alt='Discord'
              />
            </a>
          </li>
          <li>
            {renderButton()}
          </li>
        </ul>
      </header>
      <div className={styles.hero}>
        <div className={styles.leftCol}>
          <div className={styles.text}>
            <h1 className={styles.title}>🎤 Mic Check One Two ... One Two</h1>
            <p className={styles.description}>
              The Digital Sisterhood NFT is a private collection of 10,000 NFTS that celebrates Muslim Woman from all walks of life. Our collection consists of hand drawn randomly generated images.
            </p>
            <p className={styles.description}>
              Each NFT is unique and comes with traits attached to each utility that will allow you to win money and trips around the world. Including the ability to affect the decision making process through our DAO Network.
            </p>
            <div className={styles.actions}>
              <a href="https://discord.gg/eV2vpHZz" target='_blank' rel='noreferrer' className={styles.button}>Join Our Discord</a>
              <a href="http://www.twitter.com/digitalsisnft" target='_blank' rel='noreferrer' className={styles.button}>Follow Us on Twitter</a>
            </div>
          </div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.media}>
            <Image src={require('../images/sima_one.jpeg')} width={350} height={350} alt='TDS' />
          </div>
        </div>
      </div>
      <div className={styles.mint}>
          <div className={styles.leftCol}>
            <div className={styles.preview}></div>
          </div>
          <div className={styles.rightCol}>
            <h2 className={styles.title}>Connect your wallet before minting</h2>
            <div className={styles.table}>
              <div className={styles.row}>
                <div className={styles.label}>
                  Total Sold
                </div>
                <div className={styles.value}>
                  0 of 10,000
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>
                  Eth Balance
                </div>
                <div className={styles.value}>
                  {balance}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>
                  Amount
                </div>
                <div className={styles.value}>
                  1
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>
                  Total Price
                </div>
                <div className={styles.value}>
                  0.08 ETH
                </div>
              </div>
            </div>
            {renderMintButton()}
          </div>
      </div>
      <div className={styles.roadmap}>
        <h1 className={styles.title}>ROADMAP 1.0</h1>
        <p className={styles.description}>Please stay tuned on our Discord for further updates and see if you have won.</p>
        <div className={styles.items}>
          <div className={styles.item}>
            <p className={styles.percent}>10%</p>
            <p className="text-2xl flex-1">5 Golden Hijabs Distributed to holders (All Unique 1 of 1 traits)</p>
          </div>
          <div className={styles.item}>
            <p className={styles.percent}>20%</p>
            <p className="text-2xl flex-1">Diamond Hand Rewards Program (Long Term Holders)</p>
          </div>
          <div className={styles.item}>
            <p className={styles.percent}>30%</p>
            <p className="text-2xl flex-1">Portion of the proceeds goes towards charity</p>
          </div>
          <div className={styles.item}>
            <p className={styles.percent}>40%</p>
            <p className="text-2xl flex-1">Proceeds go to our cash pool for giveaways on our Discord.</p>
          </div>
          <div className={styles.item}>
            <p className={styles.percent}>90%</p>
            <p className="text-2xl flex-1">Hajj Giveaway to 3 of our diamond holders picked at random.</p>
          </div>
          <div className={styles.item}>
            <p className={styles.percent}>100%</p>
            <p className="text-2xl flex-1">Launch and Access to DAO Network.</p>
          </div>
        </div>
      </div>
      <div className={styles.team}>
        <h1 className={styles.title}>TEAM</h1>
        <div className={styles.content}>
        <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Cadar</div>
            <div className={styles.role}>Founder</div>
            <div className={styles.social}>@TheDigitalSisterhood</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Sima</div>
            <div className={styles.role}>Artist</div>
            <div className={styles.social}>@vvsima</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Hanan Sheikh</div>
            <div className={styles.role}>Project Manager</div>
            <div className={styles.social}>@hananxsh</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Alex Fox</div>
            <div className={styles.role}>Developer x DAO</div>
            <div className={styles.social}>@alalafox</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Ahmed Ahmed</div>
            <div className={styles.role}>Developer</div>
            <div className={styles.social}>@ahmedabdihd</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Sawsan</div>
            <div className={styles.role}>PR Manager</div>
            <div className={styles.social}>@sawsan</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Khadra Abdulkadir</div>
            <div className={styles.role}>Community Manager</div>
            <div className={styles.social}>@kay.abdul_</div>
          </div>
          <div className={styles.member}>
            <div className={styles.image}></div>
            <div className={styles.name}>Safia Hirsi</div>
            <div className={styles.role}>Community Manager</div>
            <div className={styles.social}>@aifassafia_</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.content}>
          <span className={styles.copy}>The Digital Sisterhood Inc. &copy; {new Date().getFullYear()}</span>
          <ul className={styles.actions}>
            <li>
              <a href="https://www.instagram.com/thedigitalsisterhood/" target='_blank' rel='noreferrer'>
                <Image
                  className={styles.logo_image}
                  src={require('../images/ig.png')}
                  width={28} height={28} 
                  layout="fixed" alt='Instagram'
                />
              </a>
            </li>
            <li>
              <a href="https://discord.gg/eV2vpHZz" target='_blank' rel='noreferrer'>
                <Image
                  className={styles.logo_image}
                  src={require('../images/discord-logo-white.png')}
                  width={34} height={38} 
                  layout="fixed" alt='Discord'
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/digitalsisNFT" target='_blank' rel='noreferrer'>
                <Image
                  className={styles.logo_image}
                  src={require('../images/twitter-logo-white.png')}
                  width={32} height={26} 
                  layout="fixed" alt='Discord'
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
