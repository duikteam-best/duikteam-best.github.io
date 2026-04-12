# Website Duikteam-Best
This is the website of Duikteam-Best - a scuba dive club

- Edit content using this Sanity Studio:
https://www.sanity.io/@ou9P5mkvH/studio/i0yqmtnuplir8xt5qlxnkerd/default/structure

- Full static website is deployed to github pages:
https://duikteam-best.github.io/

The [Github Actions workflow](https://github.com/duikteam-best/duikteam-best.github.io/actions/workflows/jekyll.yml) is triggered for all commits on main and after content is edited on Sanity. Sanity triggers the Github Action using a webhook.


## Local Dev Installation - Getting started
- Run `brew install ruby@3.1` to install Ruby
- Run `gem install bundler jekyll` to install Jekyll bundler
- Run `bundle install` to install all required dependencies

- Build and run using: `bundle exec jekyll serve`
- Open the website at: `http://127.0.0.1:4000`
