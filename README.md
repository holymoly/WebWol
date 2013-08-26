# WebWol


A Nodejs based wake on lan webserver

## What is it?

WebWol is a project that I use to learn Node. Is currently running on a raspberry pi with weezy.
You can simply add or delete a machine that you want to wake up from a config page. The list of machines is stored in a postgres database ( i know, i know... just wanted to see how to connect/read/write to a database). If the database doesnt exist it will be created when the webserver is started.
It uses Bootstrap as front-end framework and express with jade as template engine.

##Used stuff

|Name          |Version  |
|--------------|---------|
| node         | 0.10.13 |
| PostgresSQL  | 9.1.9   |
| Bootstrap    | 3.0     |

|Node Modules  |Version  |
|--------------|---------|
| express      | 3.3.4   |
| jade         | 0.35    |
| pg           | 2.3.1   |
| wake_on_lan  | 0.0.3   |
| socket.io    | 0.9.16  |
| node-net-ping| 1.1.9   |
## Installation

For Node see https://github.com/joyent/node/wiki/Installation

For Posgres 
```bash
   apt-get install postgresql
   sudo -u postgres psql postgres
   \password postgres
```

Now type your password(it will not be displayed!).
Press Control + D to exit psql. 

To install GIT
```bash
   sudo apt-get install git-core
```

To get WebWol clone the repository
```bash
   git clone https://github.com/holymoly/WebWol
   cd WebWol
   npm install
```

Now modify the config
```bash
   sudo nano config.json
```
Move the cursor to "postgrespass" and change it to your previous configured postgres Password.
Type Control + O for saving the file and Control + X to exit nano.

To start the WebWol Sserver
```bash
   sudo node app.js
```
Sudo is needed since node-net-ping was added for scanning. You should see "Express server listening on port 4000". Open your Browser and type the URL "yourip:4000".
Open the config page and add a machine.

