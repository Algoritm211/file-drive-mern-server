# Run app on your local machine


1. Clone client-side of app on your computer from [HERE](https://github.com/Algoritm211/file-drive-mern-frontend) (All instruction about server settings you can find also in README in client-side repository)
2. Clone server-side (this repository)
3. Go to server folder (`cd server`)
3. Run `npm install` to install all libraries (dependencies) of project
4. In server folder create folder with name "config" and create inside file default.json There you must add this
```js
{
  "serverPORT": <port>, // Here set your port
  "dbURL": <url> // Your Mongo Atlas DB URL, Example: mongodb+srv://<userlogin>:<password>@cluster0.udmsc.mongodb.net/<dbname>?retryWrites=true&w=majority
}
```
4. Run `npm run dev` to run app in development mode
