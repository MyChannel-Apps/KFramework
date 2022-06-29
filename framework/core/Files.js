/**
	The MIT License (MIT)

	Copyright (c) 2018 UserApps.de

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
	
	@author		Christoph Kühl <djchrisnet>
	@docs		http://www.userapps.de/documentation/core/files
*/

var Files = (new function Files() {
	this.javaClassName = 'Files';
	var rootInstance = KnuddelsServer.getAppAccess().getOwnInstance().getRootInstance();
	
	/*
		@docs	http://www.userapps.de/documentation/Files_require
	*/
	this.require = function require (filename) {
		
		if(!this.checkFile(filename)) {
			Logger.fatal(filename+' does not exists!');
			return false;
		}		
		KnuddelsServer.require(filename);
	};
	
	/*
		@docs	http://www.userapps.de/documentation/Files_execute
	*/
	this.execute = function execute(filename) {
		
		if(!this.checkFile(filename)) {
			Logger.fatal(filename+' does not exists!');
			return false;
		}		
		KnuddelsServer.execute(filename);
	};
	
	/*
		@docs	http://www.userapps.de/documentation/Files_updateAppFiles
	*/
	this.updateAppFiles = function updateAppFiles(){
		var files = rootInstance.updateAppFiles();
		
		var res = files.filter(function(filename) {
			return filename.startsWith('www/');
		});
		
		if(res.size()) {
			rootInstance.invalidateClientCache();
		}
		
		return files;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/Files_getPath
	*/
	this.getPath = function getPath(filename){
		return KnuddelsServer.getFullImagePath(filename);
	};
	
	/*
		@docs	http://www.userapps.de/documentation/Files_getSystemPath
	*/
	this.getSystemPath = function getSystemPath(filename){
		return KnuddelsServer.getFullSystemImagePath(filename);
	};
	
	/*
		@docs	http://www.userapps.de/documentation/Files_checkFile
	*/
	this.checkFile = function checkFile(filename){
		var path = '';
		
		if(filename.contains('../')) {
			return false;
		}
		
		if(filename.startsWith('./')) {
			filename = filename.substr(2);
		}

		if(filename.startsWith('/')) {
			filename = filename.substr(1);
		}
		
		if(filename.contains('/')) {
			path = filename.split('/');
			filename = path.pop();
			path = path.join('/');			
		
			try {
				return KnuddelsServer.listFiles(path).exists(path+'/'+filename);
			} catch(e) {
				return false;
			}
		}
		
		try {
			return KnuddelsServer.listFiles(path).exists(filename);	
		} catch(e) {
			return false;
		}		
	};

	/*
		@docs	http://www.userapps.de/documentation/Files_listFiles
	*/
	this.listFiles = function listFiles(path, override) {
		try {
			var files = KnuddelsServer.listFiles(path);
		} catch(e) {
			return [];
		}
				
		var options = {
			showDir: false,
			filterPath: true,
		};
		
		if(override !== undefined){
			override.each(function(val, key){
				options[key] = val;
			});
		}

		files = files.filter(function(file) {
			var dir = '';
			if(file.endsWith('/')) {
				dir = file.split('/'); dir.pop();
				file = dir.pop() + '/';
				dir = dir.join('/');
			} else if(file.contains('/')) {
				dir = file.split('/');
				file = dir.pop();
				dir = dir.join('/');
			}
			
			if(options.prefix !== undefined && !file.startsWith(options.prefix)) {
				return false;
			}
			
			if(options.type !== undefined && !file.endsWith('.'+options.type)) {
				return false;
			}
			
			if(options.showDir !== undefined && !(options.showDir) && file.endsWith('/')) {
				return false;
			}
			
			return true;
		});
		
		if(options.filterPath !== undefined && (options.filterPath)) {
			return files.map(function(file){
				if(file.endsWith('/')) {
					dir = file.split('/'); dir.pop();
					file = dir.pop() + '/';
					dir = dir.join('/');
				} else if(file.contains('/')) {
					dir = file.split('/');
					file = dir.pop();
					dir = dir.join('/');
				}
				return file;
			});
		}			

		return files;
	};
	

	/*
		@docs	http://www.userapps.de/documentation/Files_toString
	*/
	this.toString = function toString() {
		return '[KFramework Files]';
	};

}());