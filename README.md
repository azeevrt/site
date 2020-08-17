# azeevrt.github.io/site/

[Go to Azeevrt](http://azeevrt.github.io/site/)


## Clone

	git clone https://github.com/azeevrt/site.git


	.git/config // path to git 



`<name gitgub user>` change on self 
`config` file in `.git` folder:

	[core]
		repositoryformatversion = 0
		filemode = false
		bare = false
		logallrefupdates = true
		symlinks = false
		ignorecase = true
	[remote "origin"]
		url = https://github.com/ <name gitgub user> /site.git
		fetch = +refs/heads/*:refs/remotes/origin/*
	[branch "master"]
		remote = origin
		merge = refs/heads/master
	[credential]
		helper = wincred
	[user]
		name = <name gitgub user>
		email =  <email @ gitgub user>
	[credential "https://github.com/ <name gitgub user> /site.git"]
		helper = wincred
		username = <name gitgub user>


## Push

	git add --all

	git commit -m "Initial commit"

	git push -u origin master




