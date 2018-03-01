#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
import os

file_path = '../../pigcome_client/resource/default.res.json'


def update_version():
    f = open(file_path, 'r')
    f2 = open(file_path + '_', 'w')
    filters = [".json", ".png"]
    version = '2.0.0'
    for line in f.readlines():
        has_url = line.find('"url":"')
        if has_url != -1:
            for s in filters:
                has_str = line.find(s)
                if has_str != -1:
                    strs = line.split(s)
                    line = strs[0] + s + '?v=' + version + '"\n'
                    print(line.strip())
        f2.write(line)
    f.close()
    f2.close()


def rename():
    back_path = file_path + '__'
    if os.path.exists(back_path):
        os.remove(back_path)
    os.rename(file_path, back_path)
    os.rename(file_path + '_', file_path)


def run():
    update_version()
    rename()


run()
