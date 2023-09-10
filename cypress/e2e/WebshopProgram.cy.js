const { parseString } = require("fast-csv");

describe('Bol.com Test Script', () => {
  it('Zoek en bestel producten op bol.com en sla deze op in een CSV', () => {

    // Variabelen
    const baseUrl = 'https://www.bol.com/nl/nl/';
    const filterUrl = 's/?searchtext=';
    const productNaam = 'Smartphone'; 
    const productFilter = 'laag - hoog'; 
    const productCategorie1 = 'Eten';
    const productCategorie2 = 'Alles in koffie';

    let productPrijs1;
    let productPrijsDecimaal1;
    let productTitel1;
    let productPrijs2;
    let productPrijsDecimaal2;
    let productTitel2;
    let productPrijs3;
    let productPrijsDecimaal3;
    let productTitel3;

    let product1;
    let product2; 
    let product3; 

    // Ga naar de website met productnaam
    cy.visit(baseUrl + filterUrl + productNaam); 
    
    
    // Accepteer privacyvoorkeuren
    cy.get('#js-first-screen-accept-all-button').click();
    //cy.get('#js-first-screen-accept-all-button').should('not.visible');
    cy.wait(1000);

   
    // Sorteer de prijzen van laag naar hoog
    cy.get('#sort').contains(productFilter).then(option => {
      cy.wrap(option).parent().select(option.text());
    });
    cy.wait(2000);
    cy.get('.filmstrip').contains(productNaam).click();
    cy.wait(2000);
   

    // Verzamel de gegevens van product 1
    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > wsp-buy-block > div:nth-child(1) > section > div > div > span').should('be.visible').then($element => {
      productPrijs1 = parseFloat($element[0].textContent);});

    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > wsp-buy-block > div:nth-child(1) > section > div > div > span > sup').should('be.visible').then($element => {
      productPrijsDecimaal1 = parseFloat($element[0].textContent);});

    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > div > div.product-title--inline > wsp-analytics-tracking-event > a').should('be.visible').then($element => {
      productTitel1 = $element[0].textContent;});

      
    // Verzamel de gegevens van product 2 
    cy.get('#js_items_content > li:nth-child(4) > div.product-item__content > wsp-buy-block > div:nth-child(1) > section > div > div > span').should('be.visible').then($element => {
      productPrijs2 = parseFloat($element[0].textContent);});
    
    cy.get('#js_items_content > li:nth-child(4) > div.product-item__content > wsp-buy-block > div:nth-child(1) > section > div > div > span > sup').should('be.visible').then($element => {
      productPrijsDecimaal2 = parseFloat($element[0].textContent);});
    
    cy.get('#js_items_content > li:nth-child(4) > div.product-item__content > div > div.product-title--inline > wsp-analytics-tracking-event > a').should('be.visible').then($element => {
      productTitel2 = $element[0].textContent;});
    
    
    // Druk op de bestelknop en daarna op verder winkelen
    cy.get('.js_preventable_buy_action').eq(4).click() 
    cy.wait(1000);
    cy.get('[data-test="add-on-page-footer"] > [data-test="btn-continue-shopping"]').click() //cy.get('.add-on-page-header__button').click() // Naar betalen
    cy.wait(1000);
    

    // Terug naar de homepage
    cy.visit(baseUrl); 
    cy.wait(100);
    cy.get('.main-menu-btn').click();
    

    // Ga naar de categorie
    cy.get('.wsp-offcanvas--scroll-pane').contains(productCategorie1).click();
    cy.wait(100);
    cy.get('[data-test="wsp-nav-column"]').contains(productCategorie2).click();
    cy.wait(100);
    cy.get('[href="/nl/nl/l/koffie/20598/"]').click();
    cy.wait(100);


    // Verzamel de gegevens van product 3 
    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > div.product-prices > span > section > div > div > span').should('be.visible').then($element => {
      productPrijs3 = parseFloat($element[0].textContent);});
    
    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > div.product-prices > span > section > div > div > span > sup').should('be.visible').then($element => {
      productPrijsDecimaal3 = parseFloat($element[0].textContent);});
    
    cy.get('#js_items_content > li:nth-child(3) > div.product-item__content > wsp-analytics-tracking-event > a > span').should('be.visible').then($element => {
      productTitel3 = $element[0].textContent;});



    //CSV bestand schrijven
    cy.wrap(productPrijs1, productPrijsDecimaal1).then(text => {
      product1 =  productPrijs1 + ',' + productPrijsDecimaal1;
      cy.log(product1);

    cy.wrap([productPrijs2, productPrijsDecimaal2, productTitel2]).then(text => {
      product2 = productPrijs2 + ',' + productPrijsDecimaal2;
      cy.log(product2);

    cy.wrap([productPrijs3, productPrijsDecimaal3, productTitel3]).then(text => {
      product3 =  productPrijs3 + ',' + productPrijsDecimaal3;
      cy.log(product3);
    
      const csvData = 
       [

        {
          row1: baseUrl,
          row2: ' ',
        },
        {
          row1: 'Product Titel',
          row2: 'Product Prijs',
        },

        {
        row1: productTitel1,
        row2: product1,
        },

        {
        row1: productTitel2,
        row2: product2,
        },

        {
        row1: productTitel3,
        row2: product3,
        },
       ]
    
    ;
      cy.task("writeToCSV", {
        fileName: "data.csv",
        rows: csvData,
      });

    });});});

    

  });
});

