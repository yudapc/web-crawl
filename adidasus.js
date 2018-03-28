var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
});

var id = 'adidas-us';
var url = 'https://www.adidas.com/us';

casper.start();

casper.viewport(1600, 1200);
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
casper.options.waitTimeout = 20000;

casper.thenOpen(url, function() {
  this.echo('Open Page 1 : ' + this.getTitle());
  this.capture(id + '/01. page-1.png', {
    top: 0,
    left: 0,
    width: 1600,
    height: 1200,
  });
});
casper.then(function() {
  var searchElement = '.inner___3GESw .searchinput___2BN-T';
  this.sendKeys(searchElement, 'Running', {keepFocus: true});
  this.sendKeys(searchElement, casper.page.event.key.Enter , {keepFocus: true});
  this.capture(id + '/02. form-search.png', {
    top: 0,
    left: 0,
    width: 1600,
    height: 3200,
  });
});
casper.then(function() {
  this.waitForSelector('#product-grid', function() {
    this.capture(id + '/03. search-result.png', {
      top: 0,
      left: 0,
      width: 1600,
      height: 3200,
    });
  },function() {
    this.echo('error');
  });
});
casper.then(function() {
  this.echo('click first product');
  var productLink = '';
  this.evaluate(function() {
    productLink = document.querySelector('a.product-images-js:first-child').href;
    return productLink;
  });
  this.echo('Product Link: ', productLink);
  this.thenOpen(productLink, function() {
    this.waitForSelector('.order_information___2PRpc', function() {
      this.capture(id + '/04. product-detail.png', {
        top: 0,
        left: 0,
        width: 1600,
        height: 3200,
      });
    },function() {
      this.echo('error');
    });
  });
});
casper.run();
