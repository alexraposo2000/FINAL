var importCwd = require('import-cwd');
var { Given, When, Then } = importCwd('@cucumber/cucumber');
var { browser, $, element, by, ExpectedConditions } = require('protractor');
var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var request = require('request');
var axios = require('axios');
var temp_pl_name = 'K-Pop'

Given('User has a playlist {string}', async function (pl_name) {
  temp_pl_name = pl_name;

  await browser.get('http://localhost:4200/library');

  const button = element(by.css('.add-playlist-btn'));
  await button.isPresent();
  button.click();

  await browser.wait(ExpectedConditions.alertIsPresent(), 5000);
  const promptText = 'Enter a name for the new playlist:';
  const prompt = browser.switchTo().alert();
  expect(await prompt.getText()).to.equal(promptText);
  await prompt.sendKeys(pl_name);
  await prompt.accept();
});

When('I am on the Search page', async function () {
  await browser.get('http://localhost:4200/search');
});

Then('I should see a search bar', async function () {
  const searchBar = element(by.id('search-input'));
  expect(await searchBar.isPresent()).to.be.true;
});

When('I type {string} into the search bar', async function (keywords) {
  const searchBar = element(by.id('search-input'));
  await searchBar.sendKeys(keywords);
});

When('I select {string} from the drop down menu', async function (searchType) {
  const searchDropdown = element(by.id('search-type'));
  await searchDropdown.sendKeys(searchType);
});

When('I select the "Search" button', async function () {
  const searchButton = element(by.buttonText('Search'));
  await searchButton.click();
});

Then('I see the Search page with results of type {string} that match keyword {string}', async function (searchType, keyword) {
  const resultSubheader = element(by.id('result-subheader'));
  const searchResultsTable = element(by.tagName('table'));

  // Name of song is stored in first row and column of results table
  if (searchType === 'song') {
    const firstSongName = element(by.css('td.song-name'));
    expect(await firstSongName.getText()).to.equal(keyword);

  // Playlist/album name is stored as header of results table
  } else {
    expect(await resultSubheader.getText()).to.contains(keyword);
    expect(await searchResultsTable.isPresent()).to.be.true;
  }

  // Clear state
  await browser.get('http://localhost:4200/library');
  const playlistButton = element(by.cssContainingText('.playlist-btn-lib', temp_pl_name));
  await playlistButton.click();
  const button = element(by.css('.remove-playlist-btn'));
  await button.click();
});