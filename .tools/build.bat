@echo off
php -q fetch.php
java -jar yuicompressor-2.4.8.jar ../framework/KFramework.min.js --charset utf-8 --type js --nomunge --preserve-semi -o ../framework/KFramework.min.js
php -q copyright.php
pause