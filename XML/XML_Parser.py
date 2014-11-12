#!/usr/bin/env python
import sys
from bs4 import BeautifulSoup

alldata=[] #all data is a list of XML document strings
with open('example_fb_data.txt') as f:
	for line in f:
		#if line contains entry initialize single_rec list to empty
		if line.find("<entry")>-1:
			sys.stderr.write("start of record\n")
			single_rec=[] 
		#keep appending lines to this sublist ...
		single_rec.append(line.rstrip("\n"))
		#until we reach the end of the XML record, in which case we 
		#concatentate the sublist together into a long string and 
		#add it to alldata
		#end results is alldata, which is a list of XML doc strings
		if line.find("</entry")>-1:
			sys.stderr.write("end of record\n")
			alldata.append( " ".join(single_rec) )

for rec in alldata:
	XML=BeautifulSoup(rec)
	print XML.entry.id
