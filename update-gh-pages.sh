#!/bin/bash

# Script to update and deploy to gh-pages
# @author: Kenneth Kouot <kenneth@wikia-inc.com>

# Parse and save current branch
curr_git_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
has_uncommited_changes=`git status -s`

if [ -z "$has_uncommited_changes" ]; then
    echo "no changes" && exit 0
else
    echo "has changes" && exit 1
fi

# Delete remote and local 'gh-pages' branches
env -i git push origin :gh-pages
env -i git branch -D gh-pages

# Branch and checkout new 'gh-pages' branch, from your current working branch
env -i git checkout -b gh-pages

# Remove contents of pwd
if [ -d "gh-pages" ]; then
    env -i rm -rf *;
else 
    echo "It doesn't look like you're in the right folder, please check that you're in the root of your style-guide repo"
fi

# Copy the contents of gh-pages/ from your dev branch
env -i git checkout dev -- gh-pages/
# and make it's contents top level for the directory (GitHub pages requires this)
env -i cp -R gh-pages/* ./
# remove the cruft
env -i rm -rf gh-pages/

# Update the remote
env -i git add --all 
env -i git commit -m 'Updated gh-pages from dev'
env -i git push origin gh-pages

# Return to to working branch
env -i git checkout $curr_git_branch
