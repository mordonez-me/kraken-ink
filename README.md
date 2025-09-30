# Setup instructions

1. Clone the repository
2. Install dependencies using `npm install`
3. Run in Android or iOS (See Running on Android/iOS)

## Pre requisites

1. Install Metamask in Android Emulator or Metamask in an iOS device (and have
   an account)
2. Have ETH in Ink Sepolia
3. Have ASTRA in Ink Sepolia (Swap available in [astra](https://astraswap.io/))

## Setup .env file

Create a .env file in the root of the project and paste the following code:

```
EXPO_PUBLIC_WC_PROJECT_ID=xxxxxxxxxx
EXPO_PUBLIC_WEBSOCKET_URL=wss://echo.websocket.org
EXPO_PUBLIC_TOKEN_ADDRESS=0xBC82BEF6ba4A00447D70afd50E6D9c592078d8C1
```

The project id used in this .env was create for this project.

## Prebuild native projects

1. Execute in terminal `npx expo prebuild`
2. Open android/build.gradle and paste the following code **after buildscript**
   (needed for wallet connect compat compilation)

```
ext {
  compileSdkVersion = 35
  targetSdkVersion  = 35
  minSdkVersion     = 24
  kotlinVersion     = '2.1.20'
  buildToolsVersion = '35.0.0'
}
```

The problem caused because the build.gradle of wallet connect is reading
properties in the old fashion way:

`rootProject.ext.has(name) ? rootProject.ext.get(name) : project.properties["RNWalletConnectModule_" + name]`

So ext must exist to avoid reading a non existant property and break the
compilation

## Running on Android (emulator)

1. Execute `npm run android`
2. Use the app in the emulator

## Running on iOS (physical device)

1. Execute `npx pod-install` or move to ios folder using `cd ios` then
   `pod install`
2. Open Xcode and open ios folder
3. Setup a valid Team Account to auto-generate certificates and choose a real
   device
4. Run the project in xcode or in terminal with `npm run ios -- --device` and
   select the physical device from the list

## Stack used

1. Natiwind for styles
2. Reown (wagmi + viem) for connection and reading balances
3. Lucid react icons
4. Shopify Flash List for chat list (preferred in this case instead of
   gifted-chat for simplicity and not using FlatList just to demostrate the
   implementation of FlashList)
5. Keyboard Controller for chat when keyboard appears

## Additional information

Some packages are there just because they are required by other libraries, like
zustand, @tanstack/react-query that are required by reown.

Some packages were omited because they are not needed anymore in expo 54
ie.react-native-get-random-values.

Some packages and assets are there by default beacuse of the expo
initialization.

Most libraries used in the project are the latest versions (even pre-release
like native wind)

Web socket hook shows basic functionality, backoff, ping and other features are
not included because it's an echo service.

Basic tests were included for account and settings
