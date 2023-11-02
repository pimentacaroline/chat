<a name="readme-top"></a>


<div align="center">
  <h1><b>Chat App</b></h1>
</div>

<div align="center" style='width: 100px;'>
  <img src='https://github.com/pimentacaroline/chat-app/blob/master/assets/Background.png' alt='project logo'/>
</div>

<!-- TABLE OF CONTENTS -->

# Table of Contents

- [About the Project](#about-project)
  - [Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [Project Setup](#setup)
- [Author](#authors)

<!-- PROJECT DESCRIPTION -->

# About Meet App <a name="about-project"></a>

**Chat App** is a React Native, Expo, and Google Firestore Database chat app. The app will
provide users with a chat interface and options to share images and their
location.

## Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

- React Native
- Expo
- Google Firestore Database
- Google Firebase authentication
- Firebase Cloud Storage


<!-- Features -->

### Key Features <a name="key-features"></a>

- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## Project Setup <a name="setup"></a>

Create a new project with React Native:
```shell
npx create-expo-app chat_app --template
```

Install Expo Globally:
```shell
npm install - expo-cli
```

To startup Expo:
```shell
expo start
```
### Database Setup

To set up a database for this project: 
1. Create and sign-up for a database on https://firebase.google.com/
2. install firebase in your project directory: npm install firebase.
3. import personal firebase config from project settings tab in firebase console into App.js (replace existing code).
4. within firebase database rules adjust `allow read, write: if false;` to `allow read, write: if true;`.
5. Create a file called `secret.json`, and add there your Firebase data. (you can see an example of the data in the file `secret.json.example`.


### Android Studio

To utilize features of the app within the android studio emulator install these libraries in your project directory:

```shell
expo install expo-image-picker
expo install react-native-maps
expo install expo-location
expo install expo-media-library
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## Author <a name="authors"></a>

**Caroline Pimenta**

- GitHub: [@pimentacaroline](https://github.com/pimentacaroline)
- Website: https://carolinepimenta.com

This is a solo project guided by tutors and Mentors from <a href="https://careerfoundry.com/en/courses/become-a-web-developer/">CareerFoundry.</a>
