---
layout: posts
title: "Setting up XBMC plugins with Travis CI"
description: "Five misconceptions applying scrum in teams based on the official Scrum Guide"
categories: ['blog']
comments: true
meta: true
---

# Pushing to Github Pages with Travis
Setting up these two repositories to push to Github pages was pretty trivial, once I figured out the correct steps.

## Travis needs to be a user
Since Travis needs to push to Github, it needs a user. Pick or create a user, and get a Personal Access Token. This token is generated in Account Settings on Github. We chose to use the CocoaPods Bot account.


## Authenticate with that user
In order to identify as this user, Travis needs credentials. I chose to encrypt the user information using the travis gem. I ran the command below from within the project directory with the add flag so it automatically adds the encrypted output to the .travis.yml

```
travis encrypt 'GIT_NAME="Account Name" GIT_EMAIL=example@example.com GH_TOKEN=SOMEREALLYLONGSTRING' --add
```

## travis.yml
Configure git settings in .travis.yml. By default, Travis doesn't have a user, so you should set the user.email and user.name to push with. These should match the credentials you encrypted with the token.

```
install:
- git config --global user.email "bots@cocoapods.org"
- git config --global user.name "CocoaPods Bot"
```

## Updating the remote
In this setup, Travis doesn't have ssh access to the repository. Change the git remote to point to https with your token attached. The token is used to authenticate the push. Here's what the Blog setup looks like:

```
git remote set-url origin "https://${GH_TOKEN}@github.com/CocoaPods/blog.cocoapods.org.git"
```

## The .travis.yml

```
language: ruby
branches:
  only:
  - master
rvm:
- 2.0.0
install:
- git config --global user.email "bots@cocoapods.org"
- git config --global user.name "CocoaPods Bot"
- rake bootstrap
script:
- git remote set-url origin "https://${GH_TOKEN}@github.com/CocoaPods/blog.cocoapods.org.git"
- rake deploy
env:
  global:
    secure: XXXX
```

## Hady Notes...
### Encrypting deploy api-key
1. Method A
I would reccomend using the travis cli tool to setup GitHub releases (travis setup releases), as it creates the api key for you, but doing it manually isn't too bad either:

2. Method B - modify an existing travis-ci config file
Go to settings->applications in the GitHub UI. Create a new token, removing every permission except repo.
Copy the private key and run travis encrypt <key> --add deploy.api-key with the travis command line tool, which will encrypt and add the key.`


Ref: http://rafeca.com/2012/01/17/automate-your-release-flow/
> When working on an opensource project or library, it's really important to release often new versions and to document them properly.

> In this post I'm not going to talk about the benefits of frequent releases in software development, I'm just going to help you to mitigate the main problem associated to frequents releases: The release overhead which is the time you spend on preparing each release. This overhead is not that big at first, but when releasing really often it becomes a boring repetitive time-consuming task that could eventually make you release less often.

Ref: https://github.com/travis-ci/travis-ci/issues/1532#issuecomment-40069188
> We automatically create a tag when pushing to master, which causes the same commit to be built again. In our cases we do want to build the same commit separately for each branch, but don't want to build tags. An option in the repo settings to disable building tags would solve this for us.


---

When the deploy condition was set to: `test -f *zip*`, travis threw the following stack trace giving me a hint to the conditional test that it runs:
```
/home/travis/build.sh: line 282: conditional binary operator expected
/home/travis/build.sh: line 282: expected `)'
/home/travis/build.sh: line 282: syntax error near `-f'
/home/travis/build.sh: line 282: `  if [[ ($TRAVIS_REPO_SLUG = "ArabicXBMC/plugin.video.dailytube4u.com") && (test -f *.zip) ]]; then'
```

Via trial and error, the only method that satisifies the above condition is
`-n "$(find . -maxdepth 1 -name '*zip')"`. I tested this clause by creating the following simple script:

```
if [[ (1) && (-n "$(find . -maxdepth 1 -name '*zidp')") ]]; then
    echo 'hello world'
fi
```

---

Lifecycle of a Travis CI Build
It seems that if Travis deploy is configured with a conditional statement, it gets evaluated immediate after
`script` and before  `after_script`, `before_deploy` and `after_success`. 

This meant that ZIP file creation had to be part of the `script` lifecyle and not as part of `before_deploy` which made a lot of sense
