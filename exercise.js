describe('test', function() {
  it('test', function() {
    var until = protractor.ExpectedConditions;
    
    browser.get('http://qaexercise.envalfresco.com/settings');

    browser.wait(until.presenceOf(element(by.id('adf-provider-selector'))), 5000, 'Page did not load in 5 sec');
    element(by.id('adf-provider-selector')).click();
    element(by.id('mat-option-1')).click();
    element(by.id('host-button')).click();
    
    browser.wait(until.presenceOf(element(by.id('username'))), 5000, 'Login Page did not load in 5 sec');
            
    element(by.id('username')).sendKeys('guest@example.com');
    element(by.id('password')).sendKeys('Password');

    browser.wait(until.elementToBeClickable(element(by.id('username'))), 5000, 'Login button is not enabled');
    element(by.id('login-button')).click();

    browser.wait(until.elementToBeClickable(element(by.cssContainingText('a.adf-sidenav-link', 'Content Services'))), 5000, 'Content Services menu cannot be found');
    element(by.cssContainingText('a.adf-sidenav-link', 'Content Services')).click();

    var link = element.all(by.css('.adf-datatable-cell-value')).reduce(function (result, elem, index) {
      if(result) return result;
  
      return elem.getText().then(function(text){
          if(text === "a") throw new Error("Folder already exists , will result in error !!!");
          return elem;
      });
  
      }).then(function(result){
      if(!result) return result;
      });
        
    browser.wait(until.elementToBeClickable(element(by.cssContainingText('.mat-icon', 'create_new_folder'))), 5000, 'New Folder button cannot be found');
    element(by.cssContainingText('.mat-icon', 'create_new_folder')).click();

    browser.wait(until.presenceOf(element(by.id('adf-folder-name-input'))), 5000, 'New Folder dialog is not displayed');
    element(by.id('adf-folder-name-input')).sendKeys('a');

    browser.wait(until.elementToBeClickable(element(by.id('adf-folder-create-button'))), 5000, 'Create button is not enabled');
    element(by.id('adf-folder-create-button')).click();


    var link = element.all(by.css('.adf-datatable-cell-value')).reduce(function (result, elem, index) {
      if(result) return result;
  
      return elem.getText().then(function(text){
          if(text === "a") return elem;
      });
  
      }).then(function(result){
      if(!result) throw new Error("Folder not found, probably not created !!!");
      return result;
      });
    

    browser.wait(until.elementToBeClickable(element(by.cssContainingText('.mat-icon', 'create_new_folder'))), 5000, 'New Folder button cannot be found');
    element(by.cssContainingText('.mat-icon', 'create_new_folder')).click();

    browser.wait(until.presenceOf(element(by.id('adf-folder-name-input'))), 5000, 'New Folder dialog is not displayed');
    element(by.id('adf-folder-name-input')).sendKeys('a');

    browser.wait(until.elementToBeClickable(element(by.id('adf-folder-create-button'))), 5000, 'Create button is not enabled');
    element(by.id('adf-folder-create-button')).click();
    
    browser.wait(until.presenceOf(element(by.css('snack-bar-container'))), 5000, 'Error message did not appear');

    element(by.css('snack-bar-container')).getText().then(function(text){
      console.log('Error message successfully appeared: ' + text);
    });

    browser.driver.sleep(1000);
  });
});

