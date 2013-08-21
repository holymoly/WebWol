# WebWol


A Node based wake on lan webserver

## What is it?

WebWol is a project that I use to learn Node. 
You can simply add or delete a machine that you want to wake up from a config page. The list of machines is stored in a postgres database ( i know, i know... just wanted to see how to connect/read/write to a database). If the database doesnt exist it will be created when the webserver is started.
It uses Bootstrap as front-end framework and express with jade as template engine.

##Used stuff

|Name         |Version  |
|-------------|---------|
| node        | 0.10.13 |
| express     | 3.3.4   |
| jade        | 0.34.1  |
| pg          | 2.3.1   |
| wake_on_lan | 0.0.3   |
| Bootstrap   | 2.3.2   |
| PostgresSQL | 9.1.9   |

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

To get WebWol create a directory and clone the GIT
```bash
   git clone sudo apt-get install git-core
   cd WebWol
```

Now modify the config
```bash
   sudo nano config.json
```
Move the cursor to "postgrespass" and change it to your previous configured postgres Password.
Type Control + O for saving the file and Control + X to exit nano.

To start the WebWol Sserver
```bash
   node app.js
```
You should see "Express server listening on port 4000". Open your Browser and type the URL "yourip:4000".
Open the config page and add a machine.

