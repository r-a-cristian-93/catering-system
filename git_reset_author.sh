#!/bin/bash

git rebase -r $1 --exec 'git commit --amend --no-edit --reset-author'
