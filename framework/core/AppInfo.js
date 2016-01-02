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
	
	@author		Florian Berger, Christoph Kühl <djchrisnet>
*/

var AppInfo = (new function AppInfo() {
	this.javaClassName = 'AppInfo';	
    var _info			= KnuddelsServer.getAppInfo();
	var _root_instance	= undefined;
	
    this.getAppDeveloper = function getAppDeveloper() {
        return _info.getAppDeveloper();
    };

    this.getID = function getID() {
        return _info.getAppId();
    };
	
    this.getAppId = function getAppId() {
        Logger.info('AppInfo.getAppId() is DEPRECATED please use AppInfo.getID()');
		
        return this.getID();
    };

    this.getKey = function getKey() {
        return _info.getAppKey();
    };
	
    this.getAppKey = function getAppKey() {
        Logger.info('AppInfo.getAppKey() is DEPRECATED please use AppInfo.getKey()');
		
        return this.getKey();
    };

    this.getAppManagers = function getAppManagers() {
        return _info.getAppManagers();
    };

    this.getName = function getName() {
        return _info.getAppName();
    };

    this.getAppName = function getAppName() {
        Logger.info('AppInfo.getAppName() is DEPRECATED please use AppInfo.getName()');
		
        return this.getName();
    };

    this.getUID = function getUID() {
        return _info.getAppUid();
    };

    this.getAppUid = function getAppUid() {
        Logger.info('AppInfo.getAppUid() is DEPRECATED please use AppInfo.getUID()');
		
        return this.getUID();
    };

    this.getVersion = function getVersion() {
        return _info.getAppVersion();
    };

    this.getAppVersion = function getAppVersion() {
        Logger.info('AppInfo.getAppVersion() is DEPRECATED please use AppInfo.getVersion()');
		
        return this.getVersion();
    };

    this.getMaxPayoutKnuddelAmount = function getMaxPayoutKnuddelAmount() {
        return _info.getMaxPayoutKnuddelAmount();
    };

    this.getRootUID = function getRootUID() {
        return _info.getRootAppUid();
    };

    this.getRootAppUid = function getRootAppUid() {
        Logger.info('AppInfo.getRootAppUid() is DEPRECATED please use AppInfo.getRootUID()');
		
        return _info.getRootUID();
    };

    this.getTaxRate = function getTaxRate() {
        return _info.getTaxRate();
    };

    this.getTotalTaxKnuddelAmount = function getTotalTaxKnuddelAmount() {
        return _info.getTotalTaxKnuddelAmount();
    };

    this.stopApp = function stopApp(message, logMessage) {
        Logger.info('AppInfo.stopApp(message, logMessage) is DEPRECATED');

		this.setRootInstance();
        _root_instance.stopApp(message, logMessage);
    };

    this.updateApp = function updateApp(message, logMessage) {
        Logger.info('AppInfo.updateApp(message, logMessage) is DEPRECATED');

		this.setRootInstance();
        _root_instance.updateApp(message, logMessage);
    };
	
	this.setRootInstance = function setRootInstance() {
		if(typeof(_root_instance) != 'undefined') {
			return;
		}
		
		_root_instance = KnuddelsServer.getAppAccess().getOwnAppInstance().getRootInstance();
	};
	
	this.toString = function toString() {
		return '[KFramework AppInfo]';
	};
}());
