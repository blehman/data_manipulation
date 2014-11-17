# JQ-101: parsing Twitter data
Using data often requires parsing json format. [JQ](http://stedolan.github.io/jq/) makes this easy. 
## Using Github 
This tutorial makes use of github so we'll need to complete the follownig prerequisites: 

*  create a [github account](https://github.com/join).
*  download and install the [github desktop application](https://mac.github.com/).

note: I am intentionally avoiding an explaination on how to create and add ssh keys when using github commandline utilities; however, github has a [great keygen explanation](https://help.github.com/articles/generating-ssh-keys/). You should eventually learn about such things if you want to access the [many unitiles available on github](http://git-scm.com/docs). 

Please *login* to [github.com/login](https://github.com/login), visit [this repo](https://github.com/blehman/data_manipulation), and click "[Fork](https://help.github.com/articles/fork-a-repo/)" in the upper right hand conner to continue this tutorial. See below for an image.

![](https://github.com/blehman/data_manipulation/blob/master/jq-101/imgs/fork.png?raw=true =150x20)

## JQ Installation 
The easiest way that I've found to install `jq` is via [homebrew](http://brew.sh/). So open a terminal and run the following:

<pre>
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
</pre>

Now we can install `jq` with this simple command.
<pre>
brew install jq
</pre>
## Examples
Example results from Gnip's search api are included in this directory under `armour.json`.

First make sure that you cd into the location with the data. For
example, you might have cloned this repo on your Desktop in which case
you would use `cd ~/Desktop/data_manipulation/jq-101`
 
1. run `jq . armour.json` to see all of the data parsed.
2. run `jq .results[] armour.json` to see all of the results from Gnip's
   search.
3. run `jq .results[1] armour.json` to see the first result from Gnip's
   search.
4. run `jq .results[].actor armour.json` to see the actor field from
   each result.
5. run `jq .results[].actor.id armour.json` to see each actor id field as a string.
6. run `jq .results[].actor.id[15:] armour.json ` to see all characters after the
   15th character of each id field. 
7. run `jq .results[].actor.id[15:] armour.json | sed 's/"//g' | sed 's/^/from:/g'` to see a list of rules that you could place into Gnip's powertrack.



