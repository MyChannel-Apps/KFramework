/**
	The MIT License (MIT)

	Copyright (c) 2014 MyChannel-Apps.de

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
	
	@author		Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/ui/image
*/

/*
	Example:
	var image = new KImage('gt.gif').setPosition(100, -50).setLabel('Hallo Welt!');
	
	// with Link
	var link = new KLink(image);
	
	Bot.public(link);
	@docs	http://www.mychannel-apps.de/documentation/KImage_constructor
*/
function KImage(image) {
	var _path			= '';
	var _name			= '';
	var _extension		= '';
	var _properties		= {};
	var _url			= false;
	
	function KImage(image) {
		// HTTP(S) Links
		if(image.substring(0, 7) == 'http://' || image.substring(0, 8) == 'https://') {
			var split	= image.split('/');
			var length	= split.length;
			image		= split[length - 1];
			
			for(var index = 0; index < length - 1; ++index) {
				_path += split[index];
				_path += '/';
			}
			
			// Fix profile pictures
			if(_path == 'http://chat.knuddels.de/pics/fotos/') {
				_url		= true;
			}
		}
		
		// Contains properties
		if(image.indexOf('..') > -1) {
			var properties	= image.split('..');
			var split		= image.split('.');
			var length		= split.length;
			image			= properties[0];
			image			+= '.';
			image			+= split[length - 1];
			
			split.each(function(name, index) {
				if(name.length == 0 || index == 0 || index == length - 1) {
					return;
				}
				
				if(name.search(/[^a-zA-Z0-9_]+/gi) != -1) {
					return;
				}
				
				if(name.indexOf('_') != -1) {
					var split				= name.split('_');
					_properties[split[0]]	= split[1];
				} else {
					_properties[name]	= null;
				}
			});
		}
		
		var split		= image.split('.');
		
		if(['png', 'jpg', 'jpeg', 'bmp', 'gif'].indexOf(split[1].toLowerCase()) != -1) {
			_name		= split[0];
			_extension	= split[1];
		} else {
			_name		= image;
		}
		
		_name			= _name.replace(/&\.(png|jpeg|gif|jpg|bmp)/gi, '');
		var first		= _name.substring(0, 1);
		
		if(first == '/' || first == '~') {
			_name	= _name.substring(1);
			_path	= KnuddelsServer.getFullImagePath('');
		}
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_alwaysCopy
	*/
	this.alwaysCopy = function(state) {
		_properties.alwayscopy = (state == true ? null : undefined);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_noPush
	*/
	this.noPush = function(state) {
		_properties.nopush = (state == true ? null : undefined);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setContainerSize
	*/
	this.setContainerSize = function(width, height) {
		_properties.w = width;
		_properties.h = height;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setSize
	*/
	this.setSize = function(width, height) {
		_properties.mw = width;
		_properties.mh = height;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setPosition
	*/
	this.setPosition = function(x, y) {
		_properties.mx = x;
		_properties.my = y;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setX
	*/
	this.setX = function(x) {
		_properties.mx = x;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setY
	*/
	this.setY = function(y) {
		_properties.my = y;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setLabel
	*/
	this.setLabel = function(text) {
		_properties.label = text;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelPosition
	*/
	this.setLabelPosition = function(x, y) {
		_properties.lmx = x;
		_properties.lmy = y;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelColor
	*/
	this.setLabelColor = function(color) {
		_properties.labelcolor = color;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelSize
	*/
	this.setLabelSize = function(size) {
		_properties.labelfontsize = size;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_enableLabelBorder
	*/
	this.enableLabelBorder = function(bool) {
		_properties.labelborder = (bool == true ? '1' : '0');
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setBorder
	*/
	this.setBorder = function(size) {
		_properties.border = size;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setQuadcut
	*/
	this.setQuadcut = function(size) {
		_properties.quadcut = size;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setShadow
	*/
	this.setShadow = function(position) {
		_properties.shadow = position;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setMirror
	*/
	this.setMirror = function(state) {
		_properties.mirror = (state == true ? null : undefined);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setGreyscale
	*/
	this.setGreyscale = function(state) {
		_properties.gray = (state == true ? null : undefined);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_addCustom
	*/
	this.addCustom = function(name, value) {
		_properties[name] = value;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setTransparency
	*/
	this.setTransparency = function(value) {
		_properties.opacity = value;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setMouseSize
	*/
	this.setMouseSize = function(width, height) {
		_properties.mousew = width;
		_properties.mouseh = height;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_setMousePosition
	*/
	this.setMousePosition = function(x, y) {
		_properties.mousex = x;
		_properties.mousey = y;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_toString
	*/
	this.toString = function(only_path) {
		only_path		= only_path || false;
		var output		= (only_path == true ? '' : '°>') + _path + _name;
		var buffer = new StringBuffer();
		
		if(_properties.size() > 0) {
			buffer.append('..');
			
			_properties.each(function(value, name) {
				if(value == undefined) {
					return;
				}
				
				buffer.append('.' + name + (value == null ? '' : '_' + value));
			});
		}
		
		return output + (_extension.length == 0 ? '&' + buffer.toString() + '.png' : buffer.toString() + '.' + _extension) + (only_path == true ? '' : '<°');
	};
	
	KImage(image);
}