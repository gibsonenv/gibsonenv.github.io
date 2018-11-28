# Gibson Env Website

The repository for code supporting the Gibson Env [website](http://gibson.vision), for the paper *Gibson Env: Gibson Env: Real-World Perception for Embodied Agents*.


## How to update and deploy

1. Install [ruby]() and [jekyll](https://jekyllrb.com/)
```bash
sudo apt-get install rubygems
gem install bundler jekyll
```
2. Make your edits and debug. Make sure it works on local
```bash
jekyll serve --destination build	# go to http://localhost:4000
```
3. Deploy on posenet vm
```bash
scp -r build/* username@posenet.stanford.edu:/home/gibsonenv/build/
```
