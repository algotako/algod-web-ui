# Algod Web UI

A web interface to monitor an Algorand participation node.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

There are two environment variable that you need to set before this will work properly.
```
$ echo 'export PATH=$PATH:/path/to/node' >> ~/.zshrc
$ echo 'export ALGORAND_NODE=/path/to/node' >> ~/.zshrc
$ echo 'export ALGORAND_DATA=/path/to/nodedata/' >> ~/.zshrc
$ source ~/.zshrc
```
Make sure to enter the correct path to you node and data folder. You can check to see if the env variable were set with the following:
```
$ set | grep ALGORAND
```

Next you will need to clone the repo to a folder on your node
```
$ git clone https://github.com/algotako/algod-web-ui.git
```
Change directories into the algod-web-ui folder
```
$ cd algod-web-ui
```
Install dependencies using npm
```
$ npm install
```
Build the app
```
$ npm run build
```
Start the server
```
$ npm run start
```
This has only been tested on Linux and will not work on a Windows node. MacOS may work, but I haven't had a chance to test this out.

## Usage

Currently only the dashboard works, so you just need to start the server and open the site on a browser with the location from starting SolidStart.

## Contributing

This is a proof of concept idea I got from Twitter users asking for something like this. I'm not certain if the future 1click nodes will have something similar or not, but I plan to continue work on this until then.
