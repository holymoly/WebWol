# WebWol


A Node based wake on lan webserver

## What is it?

WebWol is a project that I use to learn Node. 
You can simply add or delete a machine that you want to wake up from a config page. The list of machines is stored in a postgres database ( i know, i know... just wanted to see how to connect/read/write to a database). If the database doesnt exist ist will be created when the webserver is started.
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

