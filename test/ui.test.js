const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout untuk Mocha tests

    let driver;

    // Inisialisasi Webdriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Menutup driver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    // Test case untuk memastikan halaman login berhasil dimuat
    it('should load the login page', async function() {
        await driver.get("C:/Data D/Semester 5/Praktikum PPMPL/Praktikum 4/selenium-ui-test/login.html");

        const title = await driver.getTitle();
        expect(title).to.equal('Login Page', 'Halaman login tidak terbuka dengan benar');
    });

    // Test case untuk memastikan elemen input dan tombol login terlihat di layar
    it('should verify that input fields and login button are visible', async function() {
        // Tunggu sampai elemen tersedia di DOM
        const usernameField = await driver.wait(
            until.elementLocated(By.css('#username')),
            5000, 'Field username tidak ditemukan'
        );
        const passwordField = await driver.wait(
            until.elementLocated(By.css('#password')),
            5000, 'Field password tidak ditemukan'
        );
        const loginButton = await driver.wait(
            until.elementLocated(By.id('loginButton')),
            5000, 'Tombol login tidak ditemukan'
        );

        // Validasi apakah elemen-elemen tersebut terlihat di layar
        const isUsernameVisible = await usernameField.isDisplayed();
        const isPasswordVisible = await passwordField.isDisplayed();
        const isLoginButtonVisible = await loginButton.isDisplayed();

        expect(isUsernameVisible).to.be.true;
        expect(isPasswordVisible).to.be.true;
        expect(isLoginButtonVisible).to.be.true;
    });

    // Test case untuk input menggunakan CSS Selector dan cek ulang visibilitas
    it('should input username and password using CSS Selector', async function() {
        const usernameField = await driver.findElement(By.css('#username'));
        const passwordField = await driver.findElement(By.css('#password'));

        // Pastikan elemen terlihat sebelum mengisi data
        expect(await usernameField.isDisplayed()).to.be.true;
        expect(await passwordField.isDisplayed()).to.be.true;

        await usernameField.sendKeys('cssuser');
        await passwordField.sendKeys('csspassword123');

        const usernameValue = await usernameField.getAttribute('value');
        const passwordValue = await passwordField.getAttribute('value');

        expect(usernameValue).to.equal('cssuser', 'Username tidak sesuai');
        expect(passwordValue).to.equal('csspassword123', 'Password tidak sesuai');
    });

    // Test case untuk klik tombol login menggunakan XPath
    it('should input username, password, and validate login button visibility', async function () {
        // Menunggu dan mencari field username menggunakan CSS Selector
        const usernameField = await driver.wait(
            until.elementLocated(By.css('#username')),
            10000, // Timeout 10 detik
            'Field username tidak ditemukan'
        );
        await driver.wait(
            until.elementIsVisible(usernameField),
            5000,
            'Field username tidak terlihat di layar'
        );
        await usernameField.sendKeys('testuser');
    
        // Menunggu dan mencari field password menggunakan XPath
        const passwordField = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="password"]')),
            10000,
            'Field password tidak ditemukan'
        );
        await driver.wait(
            until.elementIsVisible(passwordField),
            5000,
            'Field password tidak terlihat di layar'
        );
        await passwordField.sendKeys('password123');
    
        // Memastikan tombol login ada dan terlihat
        const loginButton = await driver.wait(
            until.elementLocated(By.id('loginButton')),
            10000, // Timeout 10 detik
            'Tombol login tidak ditemukan'
        );
        await driver.wait(
            until.elementIsVisible(loginButton),
            5000,
            'Tombol login tidak terlihat di layar'
        );
    
        // Memastikan tombol login terlihat dan siap di-klik
        const isDisplayed = await loginButton.isDisplayed();
        expect(isDisplayed).to.be.true;
    
        // Klik tombol login
        await loginButton.click();
    
        // Memastikan muncul pesan error setelah login gagal
        const errorMessage = await driver.wait(
            until.elementLocated(By.id('errorMessage')),
            10000,
            'Pesan error tidak ditemukan'
        );
        await driver.wait(
            until.elementIsVisible(errorMessage),
            5000,
            'Pesan error ditemukan tapi tidak terlihat di layar'
        );
    
        // Memeriksa teks dari pesan error
        const errorText = await errorMessage.getText();
        expect(errorText).to.equal('Invalid username or password', 'Pesan error tidak sesuai');
    });
    
});
