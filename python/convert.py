#!/usr/bin/python
# -*- coding: utf-8 -*-
import codecs
import json
import os
import re

import xlrd

relpath = os.path.dirname(os.path.realpath(__file__))
SRC = relpath + "/../../docs/"
OUT = relpath + "/../conf/"

PARSE_TYPE_BOOL = u"布尔"
PARSE_TYPE_INT = u"整数"
PARSE_TYPE_FLOAT = u"小数"
PARSE_TYPE_STR = u"文本"
PARSE_TYPE_INT_ARRAY = u"整数数组"
PARSE_TYPE_FLOAT_ARRAY = u"小数数组"
PARSE_TYPE_STR_ARRAY = u"文本数组"
PARSE_TYPE_JSON = u"JSON"


def normalize(original):
    return original.replace(u"，", u",");


def fixjson(origin):
    origin = origin.strip()
    print
    origin
    if origin.startswith('['):
        pass
    elif not origin.startswith('{'):
        origin = "{" + origin + "}"
    regexp = re.compile(r"([0-9A-Za-z_-]+)(?=:)")
    subed = regexp.sub('"\\1"', origin)
    regexp = re.compile(r'(?<=[,\[])([\.0-9A-Za-z_-]+)(?=[,\]])')
    subed = regexp.sub('"\\1"', subed)
    print
    subed
    return subed


def unicode2str(input):
    if isinstance(input, dict):
        return {unicode2str(key): unicode2str(value) for key, value in input.iteritems()}
    elif isinstance(input, list):
        return [unicode2str(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input


def parseXls(filename, sheet, indexKey, results):
    book = xlrd.open_workbook(filename)
    sh = book.sheet_by_index(sheet)
    os.path.basename(filename), sh.name.encode('utf-8'), sh.nrows, sh.ncols

    for rx in range(3, sh.nrows):
        valType = sh.cell_type(rowx=rx, colx=0)
        if (valType == xlrd.XL_CELL_EMPTY):
            continue
        item = dict()
        for cx in range(0, sh.ncols):
            key = sh.cell_value(rowx=1, colx=cx).encode('utf-8')
            type = unicode(sh.cell_value(rowx=2, colx=cx))
            parseCell(item, sh, key, rx, cx, type)
        results[item[indexKey]] = item;


def parseCell(target, sh, key, row, col, type):
    val = sh.cell_value(rowx=row, colx=col)
    valType = sh.cell_type(rowx=row, colx=col)
    # print "Parse row:%d, key:%s, col:%d, type:%d" % (row, key, col, valType)
    if valType == xlrd.XL_CELL_TEXT:
        val = val
    if not valType in (xlrd.XL_CELL_TEXT, xlrd.XL_CELL_EMPTY):
        if type == PARSE_TYPE_FLOAT or type == PARSE_TYPE_FLOAT_ARRAY:
            val = str(float(val))
        else:
            val = str(int(val))
    if type == PARSE_TYPE_BOOL:
        if str(val) == "FALSE" or str(val) == "false":
            target[key] = False
        else:
            target[key] = True
    elif type == PARSE_TYPE_INT:
        if val == "":
            target[key] = 0
        else:
            target[key] = int(val)
    elif type == PARSE_TYPE_FLOAT:
        if val == "":
            target[key] = 0.0
        else:
            target[key] = float(val)
    elif type == PARSE_TYPE_STR:
        target[key] = val.encode("utf-8")
    elif type == PARSE_TYPE_INT_ARRAY:
        if val == "" or val == -1 or val == 0:
            target[key] = []
        else:
            val = normalize(val)
            target[key] = [int(x) for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_FLOAT_ARRAY:
        if val == "" or val == -1 or val == 0:
            target[key] = []
        else:
            val = normalize(val)
            target[key] = [float(x) for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_STR_ARRAY:
        if val == "":
            target[key] = []
        else:
            target[key] = [x.encode("utf-8") for x in re.split(",|\|", val)]
    elif type == PARSE_TYPE_JSON:
        if val == "":
            # target[key] = None
            pass
        else:
            # 处理json里key没有引号的情况，并把load出得json从unicode转成str
            target[key] = unicode2str(json.loads(fixjson(val.encode('utf-8'))))


def convert(xlsx, sheetIdx, jsonName, key):
    data = dict()
    parseXls(SRC + xlsx, sheetIdx, key, data)
    codecs.open(OUT + jsonName + ".json", "w", "utf-8").write(
        json.dumps(data, indent=2, ensure_ascii=False).decode("utf-8"))
    print(jsonName + ".json")


def convertConfig(xlsx, sheetIdx, jsonName):
    data = dict()
    book = xlrd.open_workbook(SRC + xlsx)
    sh = book.sheet_by_index(sheetIdx)
    os.path.basename(xlsx), sh.name.encode('utf-8'), sh.nrows, sh.ncols
    for rx in range(1, sh.nrows):
        valType = sh.cell_type(rowx=rx, colx=1)
        if (valType == xlrd.XL_CELL_EMPTY):
            continue
        key = sh.cell_value(rowx=rx, colx=0).encode('utf-8')
        type = unicode(sh.cell_value(rowx=rx, colx=1))
        parseCell(data, sh, key, rx, 2, type)
    codecs.open(OUT + jsonName + ".json", "w", "utf-8").write(
        json.dumps(data, indent=2, ensure_ascii=False).decode("utf-8"))


convertConfig("config.xlsx", 0, "config")
convert("pseudorandom.xlsx", 0, "pseudorandom", "id")
convert("pseudorandom.xlsx", 1, "pseudorandomCount", "id")
convert("shop.xlsx", 0, "shop", "id")
convert("island.xlsx", 0, "island", "id")
convert("building.xlsx", 0, "building", "id")
convert("building.xlsx", 1, "buildingNew", "id")
convert("roller.xlsx", 0, "roller", "id")
convert("mine.xlsx", 0, "mine", "id")
convert("tutorial.xlsx", 0, "tutorial", "id")
convert("daily-prize.xlsx", 0, "dailyPrize", "id")
convert("daily-gift.xlsx", 0, "dailyGift", "id")
convert("jigsaw.xlsx", 0, "jigsaw", "id")
convert("pets.xlsx", 0, "pet", "id")
convert("pets.xlsx", 1, "petDescription", "id")
convert("cannonKing.xlsx", 0, "cannonScoreAward", "id")
convert("cannonKing.xlsx", 1, "cannonRankAward", "id")
convertConfig("kill-titan.xlsx", 0, "killTitan")
convert("kill-titan-award.xlsx", 0, "killTitanAward", "id")
convert("kill-titan-award.xlsx", 1, "killTitanGift", "id")
convert("monopoly.xlsx", 0, "monopoly", "id")
convert("xmas.xlsx", 0, "xmas", "id")
convert("gacha.xlsx", 0, "pokegoo", "id")
convert("treasure-box.xlsx", 0, "treasure", "id")
convert("octopus.xlsx", 0, "octopus", "id")
convert("octopus.xlsx", 1, "octopusRewardMoney", "id")
convert("octopus.xlsx", 2, "octopusBag", "id")
convert("octopus-gift.xlsx", 0, "octopusBox", "id")
convert("gift.xlsx", 0, "gift", "id")
convert("guild-sign.xlsx", 0, "guildSign", "id")
convert("guild-sign.xlsx", 1, "guildAttendance", "id")
convert("guild-sign.xlsx", 2, "guildFeedback", "id")
convert("guild-task.xlsx", 0, "guildTask", "id")
convert("guild-shop.xlsx", 0, "guildShop", "id")
convert("cash.xlsx", 0, "cash", "id")
convert("cash.xlsx", 1, "cashRoller", "id")
convert("cash.xlsx", 2, "inviteCash", "id")
convert("cash.xlsx", 3, "inviteCashShop", "id")
convert("inviteReward.xlsx", 0, "inviteReward", "id")
convert("daily-shop.xlsx", 0, "dailyShop", "id")
convert("yachtRace-entrust.xlsx", 0, "raceGrade", "id")
convert("yachtRace-entrust.xlsx", 1, "raceScoreGift", "id")
convert("yachtRace-entrust.xlsx", 2, "raceTask", "id")
convert("yachtRace-entrust.xlsx", 3, "raceSupplyTask", "id")
convert("yachtRace-entrust.xlsx", 4, "raceSupplyShop", "id")
convert("beach.xlsx", 0, "beachCollection", "id")
convert("beach.xlsx", 1, "beachRecipe", "id")
convert("beach.xlsx", 2, "beachSeaman", "id")
convert("beach.xlsx", 3, "beachGoldNugget", "id")
convert("noviceTask.xlsx", 0, "achievementInfo", "id")
convert("noviceTask.xlsx", 1, "achievement", "id")
convert("recruitmentOrder.xlsx", 0, "recruit", "id")
convert("nationalday-task.xlsx", 0, "festivalTask", "id")
convert("mysticalShop.xlsx", 0, "mysticalShop", "id")
convert("moonCake.xlsx", 0, "moonCakeRecipe", "id")
convert("halloween.xlsx", 0, "halloween", "id")
convert("doll.xlsx", 0, "dollConf", "id")
convert("doll.xlsx", 1, "dollRoller", "id")
convert("doll.xlsx", 2, "recyclingConf", "id")
convert("anniversary.xlsx", 0, "annualCollectRecipe", "id")
convert("anniversary.xlsx", 1, "annualRebate", "id")
# convert("anniversary.xlsx", 2, "luckyBox", "id")
convert("anniversary.xlsx", 3, "annualGift", "id")
convert("halloween.xlsx", 0, "halloween", "id")
convert("tree.xlsx", 0, "treeConf", "id")
convert("money.xlsx", 0, "shopMoney", "id")
convert("flower.xlsx", 0, "flowerReward", "id")
convert("flower.xlsx", 1, "flowerRebateEnergy", "id")
convert("flower.xlsx", 2, "flowerRebatePay", "id")
convert("festival.xlsx", 0, "lot", "id")
convert("festival.xlsx", 1, "luckyBox", "id")
convert("festivalGift.xlsx", 0, "festivalGift", "id")
