rutorrent-remote-adder, add a torrent file to rutorrent from torrent site.
================================================================

This is *was* part of the [Saber](https://github.com/SaberSalv/saber) project, but you can use this alone.

> Support sites: What, PTP, BTN, SCC, BIB, AB, bB, TPB, Demonoid, D-Addicts

> Support BT clients: rutorrent

**Features**:

- Works with both Firefox and Chrome
- add a torrent with custom label per-site

Getting started
---------------

### What is it?

It adds two icons near the download link of the torrents, after click, it'll send the torrent file to rutorrent with label set in your configuration.

![Alt text](https://raw.github.com/ezpuzze/rutorrent-remote-adder/master/snapshot.jpg "snapshot")

Development
===========

Setup Development Environment 
--------------------------

	$ bundle install

Build dist

	$ bundle exec rakep build

Run tests

	$ bundle exec rakep server
	# goto localhost:9090/tests/index.html

Contributing
-------------

* Submit any bugs/features/ideas to github issue tracker.

Pull requests are very welcome! Please try to follow these simple rules if applicable:

* Please create a topic branch for every separate change you make.
* Make sure your patches are well tested. 

Contributors
------------

@SaberSalv (original version saber-addtorrent)

* [rutorrent](http://code.google.com/p/rutorrent): Yet another web front-end for rTorrent.

Copyright
---------

(the MIT License)

Portions Copyright (c) 2011-2012 Saber

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
