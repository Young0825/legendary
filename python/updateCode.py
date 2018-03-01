#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
import itchat
###https://itchat.readthedocs.io/zh/latest/#_2
###

@itchat.msg_register(itchat.content.TEXT)
def text_reply(msg):
    msg.user.send(msg.text, msg.FromUserName)


itchat.auto_login()
itchat.run()
