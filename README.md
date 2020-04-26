# SmartDistancing App

Submission for the [Hack:Now Covid19](https://hacknow.calhacks.io/) hackathon.

## Status

Right now, the app contains a mock-up of the final functions:
- Status: see how many people are around you, based on bluetooth
- Badge: if you're connected with a SmartDistancing badge, check the real-time status of it, which should mirror the one on the Status screen. If not, you will be able to order one through the app.

## Next steps

- Test with real hardware for the Badge
- Add possibility to order the Badge from the app

---

## Setup

1. `git clone` this repo and `cd` into it
2. Install `node` with `npm`
3. Install React Native tools: `sudo npm install -g react-native-cli`
4. Install Yarn: `sudo npm install -g yarn`
5. Install project dependencies using Yarn: `yarn`

## Simulate the app

### Android

1. Install Genymotion
2. Install the Android SDK and run `sdkmanager "platforms;android-23"`
3. Launch a Genymotion terminal then `react-native run-android` from the app's directory

### iOS

1. Get a MacOS
2. Install XCode developer tools
3. Run `react-native run-ios` from the app's directory

---

## Run the app on a smartphone

### Android (debug)

1. Check that your device is connected and recognized by ADB: `adb devices` should show your device ID (you can check it in your device settings)
2. By default, the app will be built in debug mode, simply launch `react-native run-android`

### iOS (debug)

1. Check that your device is connected
2. By default, the app will be built in debug mode, you can run it from Xcode
3. Filter the debugger output to get only logs with the header `[tid:com.facebook.react.JavaScript]` if you want only the app's `console.xxx()` calls to show up
