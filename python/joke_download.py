#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
import urllib2
import re
from bs4 import BeautifulSoup
import sys
import time
import random

path = "http://www.haha365.com/joke/index_" #1.htm
pathIndex = 1
fileName = "pyFile"
fileIndex = 0
titleIndex = 1


def main():
    # ua = UserAgnet()
    # ua.random
    global pathIndex
    global titleIndex
    html = getHtmlByPage()
    soup = BeautifulSoup(html, "html.parser")

    titles = soup.findAll(href=re.compile("xd_joke/.*.htm"))
    divs = soup.findAll('div', id="endtext")

    file = open(fileName + str(fileIndex) + ".txt", "a")
    
    for i in range(len(titles)):
        t = titles[i].get_text()
        file.write(str(titleIndex) + ":" + t + "\n")
        t2 = divs[i].get_text()
        file.write(t2 + "\n")
        titleIndex += 1
    file.close()
    time.sleep(random.randint(0, 3))
    print("已下载页数:" + str(pathIndex - 1))
    while(pathIndex < 11):
        main()
    

def getHtmlByPage():
    global pathIndex
    req = urllib2.Request(path + str(pathIndex) + ".htm")
    pathIndex += 1
    req.add_header(
        'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36')
    res = urllib2.urlopen(req)
    res.encoding = 'utf-8'
    html = res.read()
    html = html.replace('&zwj;', '')
    return html

if __name__ == '__main__':
    reload(sys)
    sys.setdefaultencoding('utf-8')
    main()
