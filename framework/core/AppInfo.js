/**
	The MIT License (MIT)

	Copyright (c) 2015 Florian Berger

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	@author		Florian Berger
*/

var AppInfo = (new function AppInfo() {
    var _info = KnuddelsServer.getAppInfo();

    this.getAppDeveloper = function getAppDeveloper() {
        return _info.getAppDeveloper();
    };

    this.getAppId = function getAppId() {
        return _info.getAppId();
    };

    this.getAppKey = function getAppKey() {
        return _info.getAppKey();
    };

    this.getAppManagers = function getAppManagers() {
        return _info.getAppManagers();
    };

    this.getAppName = function getAppName() {
        return _info.getAppName();
    };

    this.getAppUid = function getAppUid() {
        return _info.getAppUid();
    };

    this.getAppVersion = function getAppVersion() {
        return _info.getAppVersion();
    };

    this.getMaxPayoutKnuddelAmount = function getMaxPayoutKnuddelAmount() {
        return _info.getMaxPayoutKnuddelAmount();
    };

    this.getRootAppUid = function getRootAppUid() {
        return _info.getRootAppUid();
    };

    this.getTaxRate = function getTaxRate() {
        return _info.getTaxRate();
    };

    this.getTotalTaxKnuddelAmount = function getTotalTaxKnuddelAmount() {
        return _info.getTotalTaxKnuddelAmount();
    };

    this.stopApp = function (message, logMessage) {
        Logger.info('AppInfo.stopApp(message, logMessage) is DEPRECATED');

        KnuddelsServer.getAppAccess().getOwnAppInstance().getRootInstance().stopApp(message, logMessage);
    };

    this.updateApp = function (message, logMessage) {
        Logger.info('AppInfo.updateApp(message, logMessage) is DEPRECATED');

        KnuddelsServer.getAppAccess().getOwnAppInstance().getRootInstance().updateApp(message, logMessage);
    };
	
}());
