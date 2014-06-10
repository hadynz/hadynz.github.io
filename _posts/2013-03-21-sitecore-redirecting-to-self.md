---
layout: post
title: "Sitecore login redirecting to itself"
date: 2013-03-21
categories: [Sitecore]
image:
  feature: covers/sitecore-cover.jpg
---
**Issue**: When you login to Sitecore, the login page keeps redirecting to itself.

I'm using Sitecore.NET 6.5.0 (rev. 111230) I tried to change the `Login.RememberLastLoggedInUserName` to false (was present and set to true).
Now I don't get to see the error anymore, but when logging in I just keep getting redirected to the login page. And I'm sure I'm entering the right credentials :) No error message, just a blank login page...

We had the same issue on 6.4.1 and I received this fix from Sitecore for this issue. It works!!! Try and see if it works for you too!

Please try to add the script like the following to the `Website\Global.asax` file (for example, right before the ending </script> tag):

```javascript
public void FormsAuthentication_OnAuthenticate(object sender, FormsAuthenticationEventArgs args)
{
   args.User = Sitecore.Context.User;
}
```

It was found when the user is authenticated using Forms authentication, he becomes the `sitecore\anonymous` again. So this code sets the right user after his logging in was successful.

Note:
Please pay attention that this is not an official hotfix. We have not deeply tested it so I recommend you to check this workaround on your testing environment before going to the production.


Good reference: `http://www.sitecore.net/Community/Technical-Blogs/John-West-Sitecore-Blog/Posts/2012/09/Object-of-type-System-Int32-cannot-be-converted-to-type-System-Web-Security-Cryptography-Purpose.aspx`