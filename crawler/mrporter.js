var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
});

var url = 'https://www.mrporter.com';
var keyword = casper.cli.args[0];
var assetPath = './assets/mrporter/' + keyword;

casper.start();
casper.viewport(1600, 1200);
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
casper.options.waitTimeout = 20000;

casper.thenOpen(url, function() {
  this.echo('Open Page 1 : ' + this.getTitle());
  this.capture(assetPath + '/01. page-1.png', {
    top: 0,
    left: 0,
    width: 1600,
    height: 1200,
  });
});
casper.then(function() {
  var searchElement = 'input#search';
  this.sendKeys(searchElement, keyword, {keepFocus: true});
  this.sendKeys(searchElement, casper.page.event.key.Enter , {keepFocus: true});
  this.capture(assetPath + '/02. form-search.png', {
    top: 0,
    left: 0,
    width: 1600,
    height: 3200,
  });
});
casper.then(function() {
  this.waitForSelector('#content', function() {
    this.capture(assetPath + '/03. search-result.png', {
      top: 0,
      left: 0,
      width: 1600,
      height: 3200,
    });
  },function() {
    this.echo('error');
  });
});
casper.thenClick('ul.pl-products li.pl-products-item a', function() {
  this.waitForSelector('#product-page', function() {
    this.capture(assetPath + '/04. product.png', {
      top: 0,
      left: 0,
      width: 1600,
      height: 3200,
    });
  },function() {
    this.echo('error');
  });
});
casper.run();
