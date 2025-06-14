---
title: 20 Linen = 1 Coat?
description: Finding out the real economics of the main metaphor for the first chapter of a certain german philosopher critique of political economy
date: "2024-2-11"
location: Berkeley
categories:
  - Marxism
  - DataSci
  - Economics
  - Political Economy
published: true
language: 
  - English
---

TLDR: it is actually 1375 yarns = 1 coat and the cost average labour cost for creating a linen coat is $23.

<center>20 Yarns of Linen = 1 coat. </center>

That is the prevailing metaphor for chapter one of a certain German philosopher's critique on political economy. But how true is this metaphor? Obviously, the philosopher does not mean for the reader to take this literary, but it is an interesting and weekly blog post filling mental exercise.

Anyways, here is a fun excerpt from said book.

> "To borrow an illustration from chemistry, butyric acid is a different substance from propyl formate. Yet both are made up of the same chemical substances, carbon (C), hydrogen (H), and oxygen (O), and that, too, in like proportions – namely, C4H8O2. If now we equate butyric acid to propyl formate, then, in the first place, propyl formate would be, in this relation, merely a form of existence of C4H8O2; and in the second place, we should be stating that butyric acid also consists of C4H8O2. Therefore, by thus equating the two substances, expression would be given to their chemical composition, while their different physical forms would be neglected."

While taking this challenge on and finding the exchange value of each chemical compound would be a fun exercises, it is 22:34 and my blog does not have a post for this week. This may be a future project though, but may need the resources of Berkeley to actually execute, and for me to change my majors.

Let us for the sake of brevity look at this in a simpler sense. I will first look at how much linen is actually comprised in one coat. Look at the exchange-value (cost in dollars) of the two commodities over time, and maybe from that find out the abstract labour cost (socially necessary or average labour time) for transforming a linen into a coat.

To prefix this, this is going to be messy with many simplifications and shortcuts.

## How many yarns of linen is in one coat?

Turns out there is [website](https://support.lionbrand.com/support/solutions/articles/17000035213-how-much-yarn-do-i-need-to-make-a-) for this exact purpose. Yarn weight is split into 7 different weights for different use cases, let's take the medium of 4 as the weight for our linen. GPT says:

> **4 - Medium:** This includes worsted, afghan, and aran weights. It's the most commonly used weight for sweaters and offers good warmth without being too heavy.

Also, I am saying a coat == a sweater/jumper because I am lazy.

So a linen weight 4 adult jumper takes from 1125–1625 yarns of linen to make, or on average 1375 yarns.

## What is the cost of linen and a coat over time?

I am running into problems getting data on this and on the coat. People don't like to publicise this data, apparently.

Getting data that spans before the internet would require me delving into library archives, another valiant task that I do not have time for, also the libraries are closed.

What I have now is some fine Irish Aran linen on [amazon](https://www.amazon.com/dp/B017T977IM?tag=camelweb-20&linkCode=ogi&th=1&psc=1&language=en_US), and I can see how the price changes over time on [camelcamelcamel](https://3cmls.co/US/B017T977IM). Unfortunately, they don't seem to have an API. The best solution on [stackexchange](https://opendata.stackexchange.com/questions/11920/extracting-data-in-tabular-form-from-camelcamelcamel) seems to be pixel parsing. I am going to see if there is literally any other way of doing that, or I will write/fine a parser. I also have a fine Irish Arann linen sweater chart [here](https://camelcamelcamel.com/product/B00JZKUAO2?context=search).

Well, apparently the website camelcamelcamel has been [banned](https://camelcamelcamel.com/contact) by Bezos from creating this. So it seems like we are manually or pixel parsing. As a last ditch effort I tried to use copilot, but it thought the graph was of temperature, it then directed me to 3 other sites that all turned out to be scams. I looked into the pixel parsing and the tools online require you still to plot it out, so I think it will take less time if I just do it manually.

Okay, that did not take so long (15min for poor data), the data is [here](https://github.com/TheArctesian/20-linen-1-coat/blob/main/data/data.csv).

## What is the abstract labour cost of constructing a coat?

Okay, so one of the linen = 186 yarns of linen. Taking our very poor estimate, one coat should cost linen time 7.4 + labour costs. Here is the graph:

![](https://raw.githubusercontent.com/TheArctesian/20-linen-1-coat/main/graphss.png)

To find the abstract labour cost I looked at the numbers and did the Price of Coat - Adjusted Price of Linen and took the average of all of those, you can find that code [here](https://github.com/TheArctesian/20-linen-1-coat/blob/main/abstract.py).

So the final result, the result of `print(dif/count)` is 23.125913978494623 or $23 is the abstract labour cost of knitting a sweater. Very roughly.

So to conclude: it is actually 1375 yarns = 1 coat and the cost average labour cost for creating a linen coat is $23.
