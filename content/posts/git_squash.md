---
title: "Squashing the commits"
date: 2021-07-06T20:37:49+06:00
draft: false
toc: true
images:
  - "/img/squash.webp"
tags:
  - git
---

Imagine on your workplace, your team uses git for verson control.
You were assigned with a new feature.
You had created a separate *feature* branch for the task & start working on it.
You have worked on several days on that branch, made some intermediate commits as a good developer.
Now you work is done & it is ready to be merged.
And your `git log --pretty=oneline` looks like this:
```
f6a02710e4395b3f411faa6232ac1dba06012df3 ready newCoolFeature
15c9fe14958a6bbf7fa56475f59eaca53eb09364 ready initial version
e5c6deffd703ae684e7fe359dfa787acc6b96de7 add missing file
72944d1f4456b72a62f24542927acf10b83d7ab5 fix typo
609384deb3f5720993d5ca69ee48f3cfe8587bef initialize new cool feature
d5cd3b96a1010b22e20d7e1e4e39a7f8144dc9fb v1.1.1
```
Here first 5 commits are related to your feature.
To maintain clean git history, you want to merge single commit to main branch instead of 5.
Here git squash comes into play.\
It will *squash* these 5 commits into one single commit, altering their commit histories but saving their actual changes.


{{< image src="/img/squash.webp" alt="cap" position="center" style="border-radius: 8px;" >}}

## What is it
Git squash means take multiple existing commits and combine them into a single commit.\
But, there is no stand-alone *git squash* command in git.
Instead *squash* is an option which can be used in other git commands.
Mostly squash is used in the *interactive rebase* (`git rebase -i`) command.\
Interactive rebase has options like *pick*, *reword*, *edit*, *squash*, *fixup*, *exec*, *break*, *drop*, *label*, *reset*, *merge*. Squashing done using various combination of these options, mostly *pick* & *squash*.\
*pick* means don't change anything to the selected commit.\
*squash* means take the selected commit's changes, meld the changes to its previous commit & update the previous commit's message, append selected commit's message to the end of the previous commit's messaege; remove the selected commits.\
*fixup* works same as *squash* but it doesn't change previous commit's message.

## How to
To squash the commits of the example, lets first *checkout* to our feature branch & run the following command.
```bash
git rebase -i HEAD~5
```
This command means, ***rebase 5 commits from HEAD going descending in interative mode***.
This command will open editor with following pre-define texts.

```
pick 609384d initialize new cool feature
pick 72944d1 fix typo
pick e5c6def add missing file
pick 15c9fe1 ready initial version
pick f6a0271 ready newCooolFeature

# Rebase d5cd3b9..f6a0271 onto 15c9fe1 (5 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
 ```

 Here, we need to work with first 5 lines.
 Rest of lines are actually comments regarding interactive rebase's options.\
 Here we want to squash commit `72944d1` to `609384d` and meld the changes to new single commit.
 To achieve this, we change the lines the following & save the changes and exit the editor.

```
pick 609384d initialize new cool feature
squash 72944d1 fix typo
squash e5c6def add missing file
squash 15c9fe1 ready initial version
squash f6a0271 ready newCooolFeature
```

After saving the changes, another editor window will pop up with the following texts.

```
This is a combination of 5 commits.
# This is the 1st commit message:

initialize new cool feature

# This is the commit message #2:

fix typo

# This is the commit message #3:

add missing file

# This is the commit message #4:

ready initial version

# This is the commit message #5:

ready newCooolFeature
```

This will be the new commit message for new commit.
We simply save the changes & exit the editor.\
That's it, our git squash is done!\
Now if we run `git log --pretty=oneline` again, we will see the following output,

```
c27c3d8922c636d9a825fc3edff06511034b7096 initialize new cool feature
d5cd3b96a1010b22e20d7e1e4e39a7f8144dc9fb v1.1.1
```

All our 5 commit's changes are ammended one after another serially & created new commit `c27c3d8922c636d9a825fc3edff06511034b7096`. 
`d5cd3b96a1010b22e20d7e1e4e39a7f8144dc9fb` now points to the new commit.

## End game
Squashing git commits is a very powerful feature.
But it is dangerous too.
As it make git history clean, in the same time it removes some commit history too.\
Some time you may want to save intermediate commits, so you can go to the specific commit & have a look.
With git squash you will loose this ability.\
Git squash is a double edge sword.
You need to be extra careful when using this feature.