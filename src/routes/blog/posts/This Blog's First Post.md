---
title: This Blog's First Post
description: Hello World! Welcome to my blog. 
date: '2023-9-17'
location: Berkeley
categories: 
    - Admin
    - Svelte
    - Web Development
    - Markdown
    - Blogging
published: true
language:
    - English
    - Assembly
---

Hello World! Welcome to my blog. 

This is not really a welcome as I have had different implementations of blog over time but I think this one will stick. 

I am a svelte zealot. For a while I had this blog set up where all I would do is manually convert my `.md` files into `json` and built another manual render for that. That was a lot of pain and the amount of pain it took to manually convert markdown to `json` was keeping publishing any posts. It also meant that embedding other assets would be impossible as I would have to create a custom render for all of that, and writing and `code` with syntax would require me to build my own parser which is not very fun.  

I am using [this guide](https://joyofcode.xyz/sveltekit-markdown-blog#project-setup) with [mdsvex](https://mdsvex.com/) now and we will see how that does. But hopefully I can now do things like: 

**this**

```cs
.global _start
.intel_syntax noprefix

// run with 
// as helloworld.asm -o asem.o
// gcc -o asm asem.o -nostdlib -static

_start: 
    // sys_write
    mov rax, 1
    mov rdi, 1
    lea rsi, [hello_world]
    mov rdx, 14
    syscall

    // sys_exit
    mov rax, 60
    mov rdi, 69
    syscall

hello_world: 
    .asciz "Hello, World!\n"
```

I am restarting this because of a [video](https://www.youtube.com/watch?v=bJQj1uKtnus) I saw today on *The Cult of Done*. *The Cult of done* as stated in it's [manifesto](https://thomasdeneuville.com/cult-of-done-manifesto/) is a simple 13 rules to get shit done. 

1. There are three states of being. Not knowing, action and completion.
2. Accept that everything is a draft. It helps to get it done.
3. There is no editing stage.
4. Pretending you know what you’re doing is almost the same as knowing what you are doing, so just accept that you know what you’re doing even if you don’t and do it.
5. Banish procrastination. If you wait more than a week to get an idea done, abandon it.
6. The point of being done is not to finish but to get other things done.
7. Once you’re done you can throw it away.
8. Laugh at perfection. It’s boring and keeps you from being done.
9. People without dirty hands are wrong. Doing something makes you right.
10. Failure counts as done. So do mistakes.
11. Destruction is a variant of done.
12. If you have an idea and publish it on the internet, that counts as a ghost of done.
13. Done is the engine of more.

While there are certain principles I can disagree with in here I in general like it. So following rule 12 I shall revive this blog. 

Thank you for your time and I hope you enjoy it. 
<br>
<hr>

This is me writing it after I am done implementing the feature took about 2 hours of pain. I did not have fun and it still is not perfect but you know what is, **DONE.**