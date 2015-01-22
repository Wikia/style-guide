#!/bin/bash

env -i git push origin :gh-pages
env -i git branch -D gh-pages
env -i git checkout -b gh-pages
env -i rm -rf *
env -i git checkout dev -- gh-pages/
env -i cp -R gh-pages/* ./
env -i rm -rf gh-pages/
env -i git add --all 
env -i git commit -m 'Updated gh-pages from dev'
env -i git push origin gh-pages
env -i git checkout dev
