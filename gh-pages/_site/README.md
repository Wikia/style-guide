# wikia.github.io/style-guide
Welcome! If you are unfamiliar with [jekyll](http://jekyllrb.com/) or [GitHub pages](https://pages.github.com/), the basics are:
* We use GitHub’s Pages feature to host the living documentation for the style guide
* GitHub allows you to host static *or* Jekyll-powered sites for each one of your repositories, under the condition that the code for this site is in the **gh-pages** branch of your repo.
* The gh-pages branch of your repo is not based off your master conventionally

With these basics in mind, welcome to contributing to the living documentation of the Wikia Style Guide. **Our Jekyll-powered site uses bower to install the `wikia-style-guide` package**. Before you add your documentation, make sure your changes to [Wikia/style-guide#master](http://www.github.com/Wikia/style-guide) are merged and then complete the following steps:
* Make sure you are on the `gh-pages` branch of this repo
* Run `$ bower cache clean && bower update`
* Add or update the documentation/section for your component
* Check in your code (including the updated bower package) to GitHub
