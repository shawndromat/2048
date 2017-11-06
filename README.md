2048
=====

### Play it [live](http://shawndromat.github.io/2048/)

a clone of [the popular 2048](https://github.com/gabrielecirulli/2048/) completely from the ground up

### Notes and learnings:
* I first made this clone right out of school using mostly vanilla js but also some jQuery. It's been pretty fun to re-write it and see what I've learned about code since then. In the original, I did not have great separation of game logic and display logic. It's interesting to see how using React (or even just anything with actual templates) for a couple years now, along with just general maturation as a developer, has ingrained that practice in me so strongly.
* In both the original clone and this re-write, I focused just on getting the game logic down, I haven't yet dipped into how to make the animations work. But I do know that I'll need to add the concept of previous coordinates in my Cell class
* A visual thing that bugged me in my original clone is that when the cells move, sometimes it looks like they move instantaneously and sometimes, they slide into place. For this re-write, I used React, thinking the fast re-rendering logic would provide instantaneous movement of the cells - a blank canvas for me to then write animations on top of. However, I still get the same sliding bugginess in this re-write. Digging a bit into the clone's code, I see that this might all be related to browser animation frames. So not only do I need to look into how that might interact with React, I'm also curious to learn more about how the browser determines how to repaint, which objects to slide and which objects to "teleport"
* Doing more functional programming is also something I'm interested in, I definitely want to challenge myself to revisit this project and write it more functionally


### Todo:
* Ignore invalid moves
* Reset button
* Animations
