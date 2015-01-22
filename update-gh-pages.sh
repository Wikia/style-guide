#!/bin/bash

env -i git branch -D gh-pages
env -i git checkout --orphan gh-pages
env -i git checkout dev -- gh-pages/
env -i cp -R gh-pages/* ./
env -i git add .
env -i git commit -m 'Updated gh-pages from dev'
env -i git push origin gh-pages
env -i git checkout dev
