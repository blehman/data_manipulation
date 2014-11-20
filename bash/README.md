# Bash tutorial
The command line utilities that come standard with a mac are amazing.

# Examples

1.  Column sum: `cat data.csv | cut -d, -f3 | tail -n26 | paste -sd+ | bc`
2.  Unique counts: `cat modata.csv | cut -d, -f1 | sort | uniq -c `
3.  Unique counts sorted in reverse: `cat modata.csv | cut -d, -f1 | sort | uniq -c | sort
    -nr `
4.  pasting columns of json together: `pr -mts, <(cat data.json | jq .data.value | head -n 10) <(cat data.json| jq .data.value | tail -n 10)`
5.  using awk for division: pr -mts, <(cat data.json | jq .data.value | head -n 10) <(cat data.json| jq .data.value | tail -n 10) | awk -F, 'BEGIN{OFS=",";FS=","} {print $1,$2,($1/$2)*100}'

