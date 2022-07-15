# Identity Verification Demo Client
> This project acts as a frontend for a fictional customer that collects information about a user during onboarding then wants to issue Unum ID credentials to them. The demo client also includes a reference to another third party, Acme, which requests the Unum ID Credential data for its own purposes. Using the Unum ID wallet the user is in full control of sharing this information.

Information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unumid.co/#demos).

This demo specifically acts as an [Issuer](https://docs.unumid.co/terminology/#issuer) in the Unum ID ecosystem while Acme acts as a [Verifier](https://docs.unumid.co/terminology/#verifier). It is worth noting while this demo interfaces with Acme, the source code for the ACME demo verifier lives in another demo [repository](https://github.com/UnumID/acme-demo-verifier-server).

## Integration Source Code Examples
One can see in the repo the use of the web-sdk to display interface with the [IDV Demo Server](https://github.com/UnumID/id-verification-demo-server) project to create and display a [Presentation Request](https://docs.unumid.co/terminology/#request) QR code. Critically it is interfacing, ultimately, with the [Server SDK](https://github.com/UnumID/server-sdk-typescript)'s [sendRequest](https://docs.unumid.co/server-sdk#sendrequest) function on the backend with the local `createPresentationRequest` function.

## Project Framework
This is a React application that uses the FeathersJS [Client](https://docs.feathersjs.com/api/client.html) to interface with a [FeatherJS](https://docs.feathersjs.com/) Server, the backend project. Specifically it is using the [Socket.io](https://docs.feathersjs.com/api/socketio.html) FeathersJS client. Please keep these details in mind when using this repo as source code examples.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Release Instructions
### Dev
Just merging changes to `main` will trigger automated deployments to dev.

### Sandbox
To release version of this project to sandbox create a Github release with a preceding `v`. This will trigger an automated deployment to sandbox.