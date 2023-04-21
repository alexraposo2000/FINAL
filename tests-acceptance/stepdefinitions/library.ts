var importCwd = require('import-cwd');
var { Given, When, Then } = importCwd('@cucumber/cucumber');
var { browser, $, element, by, ExpectedConditions } = require('protractor');
var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var request = require('request');
var axios = require('axios');
var assert = require('assert');

// Scenario 1
When('I am on the Library page', async function () {
    await browser.get('http://localhost:4200/library');
});

Then('I should see an add playlist button', async function () {
    const button = element(by.css('.add-playlist-btn'));
    expect(await button.isPresent()).to.be.true;
});
  
Then('I should see a remove playlist button', async function () {
    const button = element(by.css('.remove-playlist-btn'));
    expect(await button.isPresent()).to.be.true;
});

When('I click the add playlist button', async function () {
    const button = element(by.css('.add-playlist-btn'));
    button.click();
});

Then('I should see a text box asking me to name the new playlist with an OK button', async function () {
    await browser.wait(ExpectedConditions.alertIsPresent(), 5000);
    const promptText = 'Enter a name for the new playlist:';
    const prompt = browser.switchTo().alert();
    expect(await prompt.getText()).to.equal(promptText);
});

When('I type the playlist name {string}', async function (playlistName) {
    const prompt = browser.switchTo().alert();
    await prompt.sendKeys(playlistName);
});

When('I click OK', async function () {
    const prompt = browser.switchTo().alert();
    await prompt.accept();
});

Then('I should see a playlist named {string} in my library', async function (playlistName) {
    try {
        const alert = await browser.switchTo().alert();
        await alert.accept();
    } catch (error) {}
    
    const playlistButtons = await element.all(by.css('.playlist-btn-lib'));
    let found = false;
    for (let i = 0; i < playlistButtons.length; i++) {
        const buttonText = await playlistButtons[i].getText();
        if (buttonText === playlistName) {
            found = true;
            break;
        }
    }
    expect(found, `Playlist "${playlistName}" not found in library`).to.be.true;
});

When('I select the playlist named {string}', async function (playlistName) {
    const playlistButton = element(by.cssContainingText('.playlist-btn-lib', playlistName));
    await playlistButton.click();
});

When('I click the remove playlist button', async function () {
    const button = element(by.css('.remove-playlist-btn'));
    await button.click();
});

Then('I should no longer see the playlist named {string} in my library', async function (playlistName) {
    const playlistButton = element(by.cssContainingText('.playlist-btn-lib', playlistName));
    expect(await playlistButton.isPresent()).to.be.false;
});

// Scenario 2
Given('User has an empty playlist named {string}', async function (playlistName) {
    await browser.get('http://localhost:4200/library');

    const button = element(by.css('.add-playlist-btn'));
    button.click();

    try {
        const alert = await browser.switchTo().alert();
        await alert.accept();
    } catch (error) {}

    await browser.wait(ExpectedConditions.alertIsPresent(), 5000);

    const prompt = browser.switchTo().alert();
    await prompt.sendKeys(playlistName);
    await prompt.accept();
});

When('I am on my Search page', async function () {
    await browser.get('http://localhost:4200/search');
});

When('I have completed a search for a song named {string}', async function (songName) {
    const searchInput = element(by.id('search-input'));
    const searchButton = element(by.buttonText('Search'));
    await searchInput.sendKeys(songName);
    await searchButton.click();
});

Then('I should see the song named {string} in the results', async function (songName) {
    const firstSongName = element(by.css('td.song-name'));
    expect(await firstSongName.getText()).to.equal(songName);
});

Then('I should see a dropdown menu for playlist and an \'add\' button', async function () {
    const playlistDropdown = element(by.css('.playlist-dropdown'));
    const addButton = element(by.css('.playlist-button'));
    expect(await playlistDropdown.isPresent()).to.be.true;
    expect(await addButton.isPresent()).to.be.true;
});

When('I select {string} from my list of playlists', async function (playlistName) {
    const playlistDropdown = element(by.css('.playlist-dropdown'));
    await playlistDropdown.click();
    const playlistOption = element(by.cssContainingText('.dropdown-item', playlistName));
    await playlistOption.click();
});

When('I click the \'add\' button', async function () {
    const addButton = element(by.css('.playlist-button'));
    await addButton.click();
});

Then('I should see a popup saying the add was successful', async function () {
    await browser.wait(ExpectedConditions.alertIsPresent(), 5000);
});

Then('I navigate to the Library page', async function () {
    await browser.get('http://localhost:4200/library');
});

When('I click on playlist named {string}', async function (playlistName) {
    const playlistButton = element(by.cssContainingText('.playlist-btn-lib', playlistName));
    await browser.wait(ExpectedConditions.presenceOf(playlistButton), 5000, 'Playlist button not found');
    await playlistButton.click();
});

Then('I should see {string} in {string}', async function (songName, playlistName) {
    const songRow = element(by.cssContainingText('.song-name', songName));
    expect(await songRow.isPresent()).to.be.true;
});

Then('I should see a remove song button', async function () {
    const removeButton = element(by.css('.remove-btn'));
    expect(await removeButton.isPresent()).to.be.true;
});

When('I click the remove song button', async function () {
    const removeButton = element(by.css('.remove-btn'));
    await removeButton.click();
});

Then('I should no longer see {string} in {string}', async function (songName, playlistName) {
    const songRow = element(by.cssContainingText('.song-name', songName));
    expect(await songRow.isPresent()).to.be.false;

    // Clear state (remove playlist created for testing)
    const playlistButton = element(by.cssContainingText('.playlist-btn-lib', playlistName));
    await playlistButton.click();
    const button = element(by.css('.remove-playlist-btn'));
    await button.click();
});