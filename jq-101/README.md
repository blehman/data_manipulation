# JQ-101: parsing Twitter data
Using data often requires parsing json format. [JQ](http://stedolan.github.io/jq/) makes this easy. 

The easiest way that I've found to install `jq` is via [homebrew](http://brew.sh/). So open a terminal and run the following:

<pre>
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
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
5. run `jq .results[].actor.id` to see each actor id field as a string.
6. run `jq .results[].actor.id[15:]` to see all characters after the
   15th character of each id field. 
7. run `jq .results[].actor.id[15:] armour.json | sed 's/"//g' | sed 's/^/from:/g'` to see a list of rules that you could place into Gnip's powertrack.



