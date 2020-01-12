# Anti Theft Device

This Webpack plugin will add a snippet of code to your chunks that will check to see if
the code is running on one of your hostnames.
Its useful for when someone copies your files to make a clone of your site.
By default, it will `window.location.replace()` back to your `home` URL.
