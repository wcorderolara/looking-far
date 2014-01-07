#!/bin/sh

if [ $(ps -e -o uid, cmd | grep $UID | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
	export PATH=/usr/local/bin:$PATH
	forever start --sourceDir /root/looking-far/server.js >> /root/looking-far/log.txt 2>&1
fi
