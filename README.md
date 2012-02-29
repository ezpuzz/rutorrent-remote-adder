saber-addtorrent, add torrent to rutorrent inside PT's websites directly. 
================================================================

| Homepage:      |  https://github.com/GutenYe/saber-addtorrent       |
|----------------|----------------------------------------------------|
| Author:	       | Guten                                              |
| License:       | MIT-LICENSE                                        |
| Issue Tracker: | https://github.com/GutenYe/saber-addtorrent/issues |

This is a part of the [Saber](https://github.com/GutenYe/saber) project, but you can use this alone.

Current support websites: What, PTP, BTN, SCC, BIB, AB, bB

Getting started
---------------

### What is it?

It adds two saber icons near the download link of the torrents, after click, it'll send the torrent file to rutorrent with label "saber" and "saber1".

![Alt text](https://raw.github.com/GutenYe/saber-addtorrent/master/snapshot.jpg "snapshot")

Install
-------

1. Firefox: install [scriptish](https://addons.mozilla.org/en-US/firefox/addon/scriptish) addon. 
2. click Install at http://userscripts.org/scripts/show/125293
3. click the 'saber-addtorrent configuration' button at the end of the website.

Setup Development/Test Environment 
--------------------------

setup development environemnt

	$ npm -g install coffee-script
	$ bundle install

run test

	$ mkdir tmp assets
	$ cd assets && ln -s ../spec/fixtures spec_fixtures && cd..
	# save a fixture into spec/fixtures/what.html from http://what.cd/torrent.php
	$ bpm preview
	# goto localhost:4020/assets/jasmine/index.html?package=saber-addtorrent
	
Note on Patches/Pull Requests
-----------------------------

1. Fork the project.
2. Make your feature addition or bug fix.
3. Add tests for it. This is important so I don't break it in a future version unintentionally.
4. Commit, do not mess with rakefile, version, or history. (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
5. Send me a pull request. Bonus points for topic branches.

Credits
-------

* [Contributors](https://github.com/GutenYe/saber-addtorrent/contributors)

Resources
---------

* [saber](https://github.com/GutenYe/saber): the ultimate tool for PT
* [rutorrent](http://code.google.com/p/rutorrent): Yet another web front-end for rTorrent.
* [bpm](https://github.com/bpm/bpm): Browser Package Manager 
* [bundler](https://github.com/carlhuda/bundler): Manage your application's gem dependencies with less pain 

Copyright
---------

(the MIT License)

Copyright (c) 2011 Guten

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
