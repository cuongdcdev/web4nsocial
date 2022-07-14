

Web4Social - Decentralize social network platform on NEAR Protocol - 100% on-chain
==================


Why Web4Social? 
===========
- Decentralize, share what you wants without got restricted 
- Using Web4 techonogy, 100% on-chain of powerful blockchain NEAR Protocol
- Share your thought and get tipped with Near  
- Your data is stored on-chain NEAR , Media files are stored on IPFS!, no one can take your files down! 

Features
===========
- Run 100% on-chain on powerful NEAR blockchain using Web4 techonogy
- Homepage: browse feed
- Create post: Photo / Text / Media post, your files will be stored on IPFS - no one can take your files down
- Favorite: Save your favorite posts!
- Donate: Want to tip someone? Do it! 
- Login / Logout with NEAR 
- Profile Page: view user posts and update user profile description 
- Share: share post to other social networks
- Comment: leave your thought!


Team introduction
===========

I worked solo on this project, learned how to deploy and write contract for Web4 and many things


Video Demo
===========
[[Web4Social](https://www.youtube.com/watch?v=WnOn-FUQ7YA)



Be part of Web4Social now: 
===========
https://web4social.testnet.page/

Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet!

Go ahead and play with the app and the code. As you make code changes, the app will automatically reload.


Exploring The Code
==================

1. The "backend" code lives in the `/contract` folder. See the README there for
   more info.
2. The frontend code lives in the `/src` folder. `/src/index.html` is a great
   place to start exploring. Note that it loads in `/src/index.js`, where you
   can learn how the frontend connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and the smart
   contract. See `contract/README` for info about how it's tested. The frontend
   code gets tested with [jest]. You can run both of these at once with `yarn
   run test`.


Deploy
======

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.


Step 0: Install near-cli (optional)
-------------------------------------

[near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. It was installed to the local `node_modules` folder when you ran `yarn install`, but for best ergonomics you may want to install it globally:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx`

Ensure that it's installed with `near --version` (or `npx near --version`)


Step 1: Create an account for the contract
------------------------------------------

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `web4social.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `web4social.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

      near login

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

      near create-account web4social.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet


Step 2: set contract name in code
---------------------------------

Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'web4social.YOUR-NAME.testnet'


Step 3: deploy!
---------------

One command:

    yarn deploy

As you can see in `package.json`, this does two things:

1. builds & deploys smart contract to NEAR TestNet
2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere
