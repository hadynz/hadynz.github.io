---
layout: posts
title: "Setting up different fetch and push URLs in Git"
description: "Configuring Git to set different fetch and push URLs"
keywords: "git, push url, configuration"
date: 2014-06-27 12:12
categories: ['blog']
comments: true
meta: true
quote:
    text: "There are two ways of exerting one's strength: one is pushing down, the other is pulling up."
    author: Booker T. Washington
---
One of the Git strategies that have worked well in my current project that I am working on is to have a separate
fetch and push URL for a given repository.

What this allows you is to have a strategy where all developers pull the latest code from the _main_ repository, 
however, before they contribute back to it, they need to do so by first pushing against a **fork** of the _main_ 
repository. Once the developer is happy with his series of commits and is ready to merge back to the _main_
repository, they create a **pull request** with the modified unit of work.

This process has been really helpful in ensuring that all code gets reviewed before it is merged in to the _main_
repository.

Some Git clients like [GitExtensions](https://code.google.com/p/gitextensions/) on Windows allow for a developer to 
manually set a custom push URL. Other clients such as 
Altassian's [SourceTree](https://www.atlassian.com/software/sourcetree) do not support this feature just yet.

So here is how you can set up a separate Git push URL through a command line:

## Setting a separate Git push URL
**Step 1**: List your existing remotes in order to understand your current local setup.

~~~
$ git remote -v

# origin  git@github.com:PROJECT/REPOSITORY.git (fetch)
# origin  git@github.com:PROJECT/REPOSITORY.git (push)
~~~

<br/>
**Step 2**: Use `git remote set-url --push` to modify the push URL only of your current repository. Using `git remote set-url`
will modify both fetch and pull URL's.
   
~~~
$ git remote set-url --push origin git@github.com:USERNAME/REPOSITORY
~~~

<br/>
**Step 3**: Verify that the remote URL has been changed successfully.

~~~
$ git remote -v

# origin  git@github.com:PROJECT/REPOSITORY.git (fetch)
# origin  git@github.com:USERNAME/REPOSITORY (push)
~~~
