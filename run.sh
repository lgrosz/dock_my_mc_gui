#!/bin/bash

sudo docker run \
	-it \
	--detach \
	--publish 25565:25565 \
	--net mc_gui \
	--name mc_gui \
	-v $(pwd)/data:/usr/mc/data \
	dock_my_mc

