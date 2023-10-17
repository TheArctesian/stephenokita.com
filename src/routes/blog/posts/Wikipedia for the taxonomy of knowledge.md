---
title: Wikipedia For the Taxonomy of Knowledge 
description: Hello World! Welcome to my blog. 
date: '2023-10-17'
location: Berkeley
categories: 
    - Data Science
    - Taxonomy
    - Epistemology
    - Philosophy
published: true
---
 
I have been religiously using [obsidian](obsidian.md) for the past year or two now. While I love almost everything about it the one problem that has never escaped my mind is how do I organise the folders for my notes. 

Within the graph view, I can see how files relate to each other by how they are linked, but it is difficult to search for files within the graph view. So I need to organise files into folders and subfolders and create one to many relationships for all my files. This is easy when doing this just for something like biology, where the word taxonomy comes from, but extending that to all human knowledge becomes a little difficult.

While there is a whole field of philosophy dedicated to just that, I have just been learning a lot about early enlightenment science and wanted to put away Kant and a priori rationalisation for a while and go back to the methods of Isaac Newton and Francis Bacon. So I will take the _Hypotheses non fingo_ attitude and try and empirically find the root of all knowledge. 

Where can I find all knowledge? Wikipedia of course. Wikipedia works exactly how obsidian does, say we are taking an article about Sir Francis Bacon, well in the story of his life there are many related topics that aries, such as his book _The New Atlantis_ or his cause of death _pneumonia_. In the document itself these files will be linked as such: lorem ipsum \[\[New Atlantis]], died from \[\[pneumonia]]. What we can do then is go through that document and look scrape for those links, we can then repeat this for all of wikipedia and in count up the most frequently mentioned articles. In theory then we will find the roots of knowledge and create a taxonomy for all of knowledge based on that. 

# Method
To do this I started off by going [here](https://dumps.wikimedia.org/enwiki/latest/) to wikidumps and downloading all of wikipedia, you would be suprised to find that this is only a 20gb zip file that turns into a 90gb XML file when fully decompressed.

With this messy data I did a preliminary sweep with this little slice of regex  `\[\[(.*?)\]\]` to extract all words rapped in \[\[ ]]. When I first ran this code my computer died trying to load 90 gb or data into 16GB of RAM. I fixed this by reading only a million lines at the time and writing the extracted data to a txt file before moving onto the next. This took about an hour to do with 12 Gen I7-1260P.

After that I had a 20gb file of strings stored in a `.txt` file, but some of them are a bit weird here is an example of what the data looked like at that point.

```cs
Imperial cult  
File:Imperial Seal of Japan.svg|thumb|right|120px|[[Imperial Seal of Japan|Japanese Imperial kamon  
chrysanthemum  
Gukanshō  
Richard Ponsonby-Fane|Ponsonby-Fane, Richard Arthur Brabazon  
Isaac Titsingh|Titsingh, Isaac.  
Nihon Ōdai Ichiran  
H. Paul Varley|Varley, H. Paul.  
Emperor Kanmu
```

After doing more regex to remove the data after the `|` and any line that had 'File:' on it I had about a 10 GB file of workable data. I then wrote a simple counting script and let it run for 20 min. When it finished I opened the file excited to see the answer to knowledge but instead saw this.

```json
wp:aes: 2991227
wikipedia:deletion review: 1545692
category:living people: 1065612
project:awb: 897698
help:using talk pages: 850317
wp:hc: 573711
wp:lint: 519200
user:malnadachbot/task 12: 505960
en:user:coibot#blacklist: 484829
wikipedia:articles for deletion/pagename (2nd nomination): 477692
```

Disappointed I put in a little more regex and was finlay left with a GB long file with the secrets to the organisation of all knowledge.

So what did I find well you can look through the data yourself [here](ADD THIS LINK), but as a sneak peak here are the top 50:

```cs
united states: 376794
the new york times: 284281
association football: 236025
newspapers.com: 228231
billboard (magazine): 208925
france: 204663
united states census bureau: 204531
world war ii: 203688
user talk:gene93k: 189642
germany: 187335
new york city: 179934
london: 178835
india: 176534
democratic party (united states): 149398
japan: 141624
the guardian: 140126
republican party (united states): 137435
united kingdom: 137111
italy: 130186
england: 130083
u.s. state: 129897
russia: 127597
central european summer time: 126402
youtube: 125936
australia: 125118
canada: 120589
california: 119019
central european time: 118420
template:redirect category shell: 115640
midfielder: 114862
list of sovereign states: 111861
china: 105420
world war i: 103931
spain: 101453
user talk:anomiebot: 101019
iran: 100726
user talk:coibot: 97764
chevrolet: 96983
national register of historic places: 95164
defender (association football): 94756
paris: 94271
forward (association football): 92123
los angeles times: 91355
soviet union: 90685
race (united states census): 89995
ford motor company: 89879
brazil: 88163
poland: 87626
sweden: 85265
english language: 84995
geographic names information system: 82439
```

Yeah that did not do what I wanted it to do. This data is still pretty interesting to look through to see the bias and hot spots topics of wikipedia but does not give us the fundamental taxonomy of all knowledge. 

There is obviously a lot of bias with this being an community driven repository of knowledge written in English we are going to get `united states` and `france` (??????) near the top. What I do find very interesting that I forgot to filter out are the users that show up, such as `user talk:gene93k: 189642`, `user talk:anomiebot: 101019` and `user talk:coibot: 97764`. While I really should have removed these strings from that dataset, I want to keep it up there so they we have a record that these people (or are they people??) have more sway than the idea of `race` or most countries or ironically `genus`. It also makes you wonder how much power these people actually have in swaying what humanity understands as fact. Pretty scary.

So what have we learnt, either wikipedia is just bad data and I need to repeat this test on something like JSTOR - at risk of becoming Aaron Swartz 2.0 - or empiricism (baconian) is just now the right process for looking at the structure of knowledge. As I don't want to get arrested I am going to say I made an epistemological error. It seems like I'm going to have to go back to Kant and do some rational a priori analysis then. Still this was fun. 

All my speget code for this project will be available on my [github](https://github.com/TheArctesian/Wikipedia-Knowledge-Taxonomy), it really is shit speget code, you can go to the wikidumps link above if you want to replicate this experiment.