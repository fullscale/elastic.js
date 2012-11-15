# elastic.js

Javascript API for ElasticSearch

## Getting Started
### On the server
Install the module with: `npm install elastic.js`

```javascript
var ejs = require('elastic.js');
ejs.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/fullscale/cloud9-javascript-api/master/elastic.min.js
[max]: https://raw.github.com/fullscale/cloud9-javascript-api/master/elastic.js

In your web page:

```html
<script src="elastic.min.js"></script>
<script>
ejs.awesome(); // "awesome"
</script>
```

In your code, you can attach elastic.js methods to any object.

```html
<script>
this.exports = Bocoup.utils;
</script>
<script src="dist/elastic.min.js"></script>
<script>
Bocoup.utils.awesome(); // "awesome"
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit elastic.js and elastic.min.js files as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 FullScale Labs, LLC  
Licensed under the MIT license.
