#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
from collections import defaultdict

#set this value to True if data is: userID1, userID2, color_group1, color_group2
#set this value to False if data is: userID1, userID2
color_group = False

links = []
nodes = []
info = defaultdict(str)

#def add_value(myset,value):
#    myset.add(value)
#    return myset

def enum(sequence, start=0):
    n = start
    for elem in sequence:
        yield elem["name"], n
        n += 1
for line in sys.stdin:
    link = line.strip().split("\t")
    #d0[link[0]] = add_value(d0.get(link[0],set()),link[0])
    #d1[link[1]] = add_value(d1.get(link[1],set()),link[1])
    links.append({"source":link[0],"target":link[1]})
    if color_group:
        info[link[0]] = link[2]
        info[link[1]] = link[3]
    else:
        info[link[0]]
        info[link[1]]

for name in info:
    if color_group:
        nodes.append({"name":name,"color_group":info[name]})
    else:
        nodes.append({"name":name})

link_values = dict(enum(nodes))

for link in links:
    link["source"] = link_values[link["source"]]
    link["target"] = link_values[link["target"]]

print json.dumps({"nodes":nodes,"links":links})
