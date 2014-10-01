# Hady.geek.nz
Been a long time coming, but finally decided to extend my voice out to the world... and blog!

##This is the data for my blog
It is automatically transformed by "Jekyll":http://github.com/mojombo/jekyll into a static site whenever I push 
this repository to GitHub.

I was tired of having my blog posts end up in a database off on some remote server. That is backwards. I've lost 
valuable posts that way. I want to author my posts locally in Textile or Markdown. My blog should be easily 
stylable and customizable any way I please. It should take care of creating a feed for me. And most of all, my 
site should be stored on GitHub so that I never lose data again.

## Run it locally
The following commands are from [Jekyll](http://jekyllrb.com/docs/usage/)'s documentation for building and running 
the site.

```shell
jekyll serve
# => A development server will run at http://localhost:4000/

$ jekyll serve --detach
# => Same as `jekyll serve` but will detach from the current terminal.
#    If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
#    If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance. [Read more](http://unixhelp.ed.ac.uk/shell/jobz5.html).

$ jekyll serve --watch
# => Same as `jekyll serve`, but watch for changes and regenerate automatically.
```

## Creating content
There are two main content layouts: post.html (for posts) and page.html (for pages). Both have large feature images 
that span the full-width of the screen, and both are meant for long form articles and blog posts.

There are two rake tasks that can be used to create a new post or page with all YAML Front Matter. Using either `rake 
new_post` or `rake new_page` will prompt you for a title and tags to classify them. Example below:

```shell
rake new_post

Enter a title for your post: My Awesome Post
Enter category name to group your post in (leave blank for none): blog
Enter tags to classify your post (comma separated): web development, code
Creating new post: _posts/2014-02-10-my-awesome-post.md
```

There are a few configuration variables that can be changed in Rakefile.rb. By default posts and pages will be 
created in MarkDown using the `.md` extension.

## Keeping Jekyll up to date
Jekyll's an active open source project, and is updated frequently. As the GitHub Pages server is updated, the software 
on your computer may become out of date, resulting in your site appearing different locally from how it looks when 
published on GitHub. To keep Jekyll up to date, you can run `gem update github-pages`.