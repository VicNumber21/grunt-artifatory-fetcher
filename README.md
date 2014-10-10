# grunt-artifactory-fetcher
Idea was taken from grunt-artifatory-artifact
http://github.com/leedavidr/grunt-artifactory-artifact , version 0.6.4, by David Lee.
David's implementation has extra features like compression / decompression
which cannot be disabled. I did not need that thus created my implementation based on his one.

Mine implementation is as simple as it is possible.
It is just a fetcher of the file.
It does not unpack artifacts as original version since it is not what you need probably.
Also it fixes artifactory url building for case when you don't need a version.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-artifactory-fetcher --save-dev
```

or add the following to your package.json file:
```js
{
  "devDependencies": {
    "grunt-artifactory-fetcher": "0.0.1"
  }
}
```

Once the plugin has been installed, enabled it inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-artifactory-fetcher');
```

## Artifactory Fetch Task
_Run this task with the `grunt artifactory:target:fetch` command._

### Examples
```js
artifactory: {
  client: {
    url: 'http://artifactory.google.com:8080',
    repository: 'jslibraries',
    options: {
      fetch: [{
        group_id: 'com.google.js',
        name: 'jquery',
        ext: 'tgz',
        version: '1.8.0',
        path: 'tmp/jquery.tgz'
      }]
    }
  }
}
```

Path 'tmp/' must exist before fetching.


### Options

There are a number of options available.

#### url
Type: `String`

This defines the url of your artifactory repository. This should be the base URL plus port. Ex: `http://your-artifactory-repository:8080`

#### repository
Type: `String`

This defines the name of the repository. _Since this task uses the REST API, the repository is not inferred_

#### fetch
Type: `Array{Object}`

This defines an array of artifactory artifacts to be retrieved from artifactory. Each artifact has config options:

##### group_id
Type: `String`

This defines the group_id of the artifact. Ex: `com.google.js`

##### name
Type: `String`

This defines the name of the artifact. Ex: `jquery`

##### ext
Type: `String`

This defines the extension of the artifact. Ex: `tgz`

##### classifier
Type: `String`

This defines the optional classifier to the artifact name. Ex: `javadoc`

##### version
Type: `String`

This defines the version of the artifact. Ex: `1.8.0`

##### path
Type: `String`

This defines the path where the artifact will be saved to. Ex: `tmp/jquery.tgz`


## License
MIT
