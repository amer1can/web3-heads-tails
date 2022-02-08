<template>
  <div class="main">
    <div class="header pt-4">Epic Game Production</div>
    <p class="subheader mt-3">Top rated NFT game to play!</p>
    <div v-if="!walletStatus">
      <button class="walletbtn mt-3" @click="connectToWallet">Connect to wallet</button>
    </div>
    <div v-else>
      <h1 class="text-white">Connected</h1>
      <button class="btn btn-danger" @click="playIt">Play</button>
    </div>
  </div>


  <div class="footer">
    <img src="./assets/twitter-logo.svg" alt="">
    <a href="https://twitter.com/amer1canWM" target="_blank" rel="noreferrer">Seeing on Twitter</a>
  </div>
</template>

<script>

import ethers from 'ethers';
import abi from './utils/HeadsOrTails.json';

export default {
  name: 'App',
  data() {
    return {
      gameContract: null,
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      contractABI: abi.abi,
      account: null,
      walletStatus: false,
      currentAccount: null,
    }
  },
  async beforeMount() {
    await this.checkIfWalletConnect()
  },
  mounted() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    this.gameContract = new ethers.Contract(this.address, this.contractABI, signer)
  },

  methods: {
    async checkIfWalletConnect() {
      try {
        const { ethereum } = window;

        if(!ethereum) { console.log('Make sure you have Metamask'); return; }
        else { console.log('We have ethereum object', ethereum) }

        await this.checkNetwork()

        const accounts = await ethereum.request({
          method: 'eth_accounts'
        })

        if(accounts.length !== 0) {
          this.currentAccount = accounts[0]
          this.walletStatus = true
          console.log('Found authorized account', this.currentAccount)

        } else { console.log('No authorized accounts found'); this.walletStatus = false }

      }catch(err) { console.log(err) }
    },
    async checkNetwork() {
      try {
        // if (window.ethereum.networkVersion != '4') { alert('Please, connect to Rinkeby Network!') }
        console.log('network version: ',window.ethereum.networkVersion)
      } catch (err) { console.log(err) }
    },
    async connectToWallet() {
      try {
        const { ethereum } = window;

        if(!ethereum) { console.log('Get Metamask!'); this.walletStatus = false; return; }

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        })
        this.currentAccount = accounts[0]
        this.walletStatus = true
        console.log('Connected', this.currentAccount)
      } catch(err) { console.log(err) }
    },
    async playIt() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const gameContract = new ethers.Contract(this.address, this.contractABI, signer)
      const txn = await gameContract.makeBet(1)
      console.log('waiting...') //31337
      txn.wait()
      console.log('txn: ', txn)
    },
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #100f0f;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main {
  flex-grow: 1;
}
.header {
  font-size: 50px;
  font-weight: bold;
  background: -webkit-linear-gradient(left, #e8b756 30%, #e71515 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subheader {
  font-size: 30px;
  color: white;
}
.walletbtn {
  font-size: 22px;
  padding: 0.5em;
  border-radius: 15px;
  background: -webkit-linear-gradient(left, #e8b756, #e71515);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  align-self: center;
}
.char-cards {
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  justify-content: center;
}
.card {
  padding: 20px;
  background: #e8b756!important;
}
.boss {
  background: #ff4444!important;
}

.card img {
  flex-grow: 1;
}
.battle {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero {
  transform: scale(1);
  transition: all 0.5s ease-in-out;
}
.hero:hover {
  transform: scale(1.05);
  transition: all 0.5s ease-in-out;
}
.boss {
  transform: rotate3d(0, 0, 0, 0deg);
  transition: all 0.5s ease-in-out;
}
.boss:hover {
  transform: rotate3d(1, 1, 1, 15deg);
  transition: all 0.5s ease-in-out;
}
progress {
  width: 100%;
  height: 50px;
}
.attr {
  position: relative;

}
.health {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
}

.swords.attacking {
  width: 100px;
  height: 100px;
  background: url("assets/waiting.gif");
  background-size: contain;
}
.swords.attacking > button {
  display: none;
}

.swords.hit {
  background: none;
}
.swords.hit > button {
  display: inline-block;
}

.footer {
  padding: 20px 0px;
}
.footer a {
  color: coral;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in;
}
.footer a:hover {
  color: #ff4444;
  transition: all 0.2s ease-in;
}
.footer img {
  width: 30px;
}


/* KeyFrames */
@-webkit-keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
