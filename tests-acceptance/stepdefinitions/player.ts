var importCwd = require('import-cwd');
var { Given, When, Then } = importCwd('@cucumber/cucumber');
var { browser, $, element, by, ExpectedConditions } = require('protractor');
var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var request = require('request');
var axios = require('axios');
var assert = require('assert');

Given('I am on the search page', async function () {
  await browser.get('http://localhost:4200/search');
});

When('I have completed a search for a {string} matching {string}', async function (search_type, keyword) {
  // Enter search terms
  const searchBar = element(by.id('search-input'));
  await searchBar.sendKeys(keyword);

  const searchDropdown = element(by.id('search-type'));
  await searchDropdown.sendKeys(search_type);

  const searchButton = element(by.buttonText('Search'));
  await searchButton.click();
});

Then('I should see rows of songs', async function () {
  // Check existence of song results
  const searchResultsTable = element(by.tagName('table'));
  expect(await searchResultsTable.isPresent()).to.be.true;
});

When('I click play for a song called {string}', async function (song_name) {
  const songNameColumn = element.all(by.css('.song-name'));
  const playButtons = element.all(by.css('.play-button'));

  // Find the index of the row containing the song
  const songIndex = await songNameColumn.map(function (elem) {
    return elem.getText();
  }).then(function (textArr) {
    return textArr.indexOf(song_name);
  });

  // Click the play button for the song
  await playButtons.get(songIndex).click();
});

Then('I should see the Player page', async function () {
  const playerContainer = element(by.css('.player-container'));
  expect(await playerContainer.isPresent()).to.be.true;
});

Then('{string} by {string} starts playing', async function (song_name, artist_name) {
  // Check existence of song and artist name
  const songNamePlayer = element(by.css('.song-name-player'));
  const artistNamePlayer = element(by.css('.artist-name-player'));
  expect(await songNamePlayer.isPresent()).to.be.true;
  expect(await songNamePlayer.getText()).to.equal(song_name);
  expect(await artistNamePlayer.isPresent()).to.be.true;
  expect(await artistNamePlayer.getText()).to.equal(artist_name);
});

Then('I should see a play or pause button', async function () {
  // Check existence of play/pause button
  const playPauseButton = element(by.css('.play-pause-button'));
  expect(await playPauseButton.isPresent()).to.be.true;
});

When('I click the play or pause button', async function () {
  // Click play
  const playPauseButton = element(by.css('.play-pause-button'));
  await playPauseButton.click();
});

Then('the song should start or stop playing and I should see the opposite button', async function () {
  // Wait until elapsed time has text '0:02'
  const timeElapsed = element(by.css('.time-elapsed'));
  await browser.wait(ExpectedConditions.textToBePresentInElement(timeElapsed, '0:02'), 5000);

  // Check that pause image is displayed when playing
  const playPauseButton = element(by.css('.play-pause-button'));
  const playPauseButtonImage = element(by.css('#playPauseButton'));
  const pauseImageSource = 'http://localhost:4200/assets/pause.png';
  expect(await playPauseButtonImage.getAttribute('src')).to.equal(pauseImageSource);

  // Pause song
  playPauseButton.click();
  await browser.sleep(1000);

  // Check that play image is displayed when paused
  const playImageSource = 'http://localhost:4200/assets/play.png';
  expect(await playPauseButtonImage.getAttribute('src')).to.equal(playImageSource);

  // Check that elapsed time is still '0:02' after pausing for a second
  const finalTime = await timeElapsed.getText();
  expect(finalTime).to.equal('0:02');
});