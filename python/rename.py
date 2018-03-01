#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
import os

file_path = '/Users/young/Downloads/厄瓜多尔'
island = "62"

def rename(p):
   for file in os.listdir(p):
   	 	newFile = p + "/" + file
   	 	if os.path.isdir(newFile):
   	 		rename(newFile)
   	 	else :
   	 		newName = getName(newFile, p)
   	 		print(newName)
   	 		os.rename(newFile, newName)

def getName(p, p2):
	str = island
	
	if "景" in p:
		str += "_1"
	elif "船" in p:
		str += "_2"
	elif "物" in p:
		str += "_3"
	elif "房" in p:
		str += "_4"
	elif "雕" in p:
		str += "_5"

	
	if "5" in p:
		str += "_5"
	elif "4" in p:
		str += "_4"
	elif "3" in p:
		str += "_3"
	elif "2" in p:
		str += "_2"
	elif "1" in p:
		str += "_1"

	if "-" in p:
		str += "_1"
	else :
		str += "_0"
	
	if "图标" in p:
		return p2 + "/building_icon_" + str + ".png"
	else :
		return p2 + "/" + str + ".png"
	

def run():
    rename(file_path)



run()
