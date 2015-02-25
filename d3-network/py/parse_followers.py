#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This script takes userID,followerID,optionalBoolean,optionalBoolean and outputs a data format that can be used in w/ D3's force directed layout.

Future iteration goals:
    - add an args parser to pass flag for the optional booleans, data file location.
    - OO friendly.
"""

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

# slight change to the enumerate() function
def enum(sequence, start=0):
    n = start
    for elem in sequence:
        yield elem["name"], n
        n += 1

if __name__ == '__main__':
    # create a dict of nodes and list of edges
    for line in sys.stdin:
        link = line.strip().split("\t")
        try:
            links.append({"source":link[0],"target":link[1]})
            if color_group:
                info[link[0]] = link[2]
                info[link[1]] = link[3]
            else:
                info[link[0]]
                info[link[1]]
        except IndexError:
            sys.stderr.write("ListErrror on: {}\n".format(link))
            continue

    # create a list of nodes (*required d3 data format for force directed lib).
    for name in info:
        if color_group:
            nodes.append({"name":name,"color_group":info[name]})
        else:
            nodes.append({"name":name})

    # enumerates the links so the source/target values use the index of the nodes (*required d3 data format force directed lib)
    link_values = dict(enum(nodes))
    for link in links:
        link["source"] = link_values[link["source"]]
        link["target"] = link_values[link["target"]]

    print json.dumps({"nodes":nodes,"links":links})
