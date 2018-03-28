var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

var product_link = '';

casper.start();

casper.viewport(1600, 1200);
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
casper.options.waitTimeout = 20000; 


casper.thenOpen('https://www.aliexpress.com',function(){
	this.echo("Open Page 1 : "+this.getTitle());

	this.capture('ali-page-1.png', {
        top: 0,
        left: 0,
        width: 1600,
        height: 1200
    });
});


casper.thenEvaluate(function(term) {
    document.querySelector('#search-key').setAttribute('value', term);
    document.querySelector('#form-searchbar').submit();
}, 'men');


casper.then(function(){
    this.echo("Open Page 2 : "+this.getTitle());
	this.capture('ali-page-2.png', {
        top: 0,
        left: 0,
        width: 1600,
        height: 3200
    });
});

casper.then(function() {
    this.waitForSelector('#hs-below-list-items', function() {
        this.click('#hs-below-list-items > li:nth-child(1) > div > div.info > h3 > a');
        // this.evaluate(function(){
        //     $('#hs-below-list-items > li:nth-child(1) > div > div.info > h3 > a').click();
        // });
    },function(){
        this.echo('error');
    });

});

casper.then(function(){
    this.echo("Open Page 3 : "+this.getTitle());
    this.capture('ali-page-3.png', {
        top: 0,
        left: 0,
        width: 1600,
        height: 3200
    });
});


// casper.then(function() {
//     var product_link = this.evaluate(function(){
//     	return document.querySelector('#reskinned_page > div.vm__product-explorer.u-bg--sand > section.o-container.o-container--responsive > div > div > ul > li:nth-child(1) > div > div.c-card__body > div.c-product-card-description > a').getAttribute('href');
//     });
// });


casper.run(function(){

});
