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
var KImage			= KImage || (function(image) {
	this._path			= '';
	this._name			= '';
	this._extension		= '';
	this._properties	= {};
	
	// HTTP(S) Links
	if(image.substring(0, 7) == 'http://' || image.substring(0, 8) == 'https://') {
		var split	= image.split('/');
		var length	= split.length;
		image		= split[length - 1];
		
		for(var index = 0; index < length - 1; ++index) {
			this._path += split[index];
			this._path += '/';
		}
	}
	
	// Contains properties
	if(image.indexOf('..') > -1) {
		var properties	= image.split('..');
		var instance	= this;
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
				var split						= name.split('_');
				instance._properties[split[0]]	= split[1];
			} else {
				instance._properties[name]		= null;
			}
		});
	}
	
	var split		= image.split('.');
	
	if(['png', 'jpg', 'jpeg', 'bmp', 'gif'].indexOf(split[1].toLowerCase()) != -1) {
		this._name		= split[0];
		this._extension	= split[1];
	} else {
		this._name		= image;
	}
	
	this._name		= this._name.replace(/&\.(png|jpeg|gif|jpg|bmp)/gi, '');
	var first		= this._name.substring(0, 1);
	
	if(first == '/' || first == '~') {
		this._name	= this._name.substring(1);
		this._path	= KnuddelsServer.getFullImagePath('');
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KImage_toString
	*/
	this.toString = function toString(only_path) {
		only_path		= only_path || false;
		var output		= (only_path == true ? '' : '°>') + this._path + this._name;
		var buffer		= new StringBuffer();
		
		if(this._properties.size() > 0) {
			buffer.append('..');
			
			this._properties.each(function(value, name) {
				if(value == undefined) {
					return;
				}
				
				buffer.append('.' + name + (value == null ? '' : '_' + value));
			});
		}
		
		return output + (this._extension.length == 0 ? '&' + buffer.toString() + '.png' : buffer.toString() + '.' + this._extension) + (only_path == true ? '' : '<°');
	};
	
	return this;
});

KImage.prototype	= KImage.prototype || {};

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_addCustom
*/
if(!KImage.prototype.addCustom) {
	Object.defineProperty(KImage.prototype, 'addCustom', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function addCustom(name, value) {
			this._properties[name] = value;
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_alwaysCopy
*/
if(!KImage.prototype.alwaysCopy) {
	Object.defineProperty(KImage.prototype, 'alwaysCopy', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function alwaysCopy(state) {
			this.addCustom('alwayscopy', (state ? null : undefined));
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_noPush
*/
if(!KImage.prototype.noPush) {
	Object.defineProperty(KImage.prototype, 'noPush', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function noPush(state) {
			this.addCustom('nopush', (state ? null : undefined));
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setContainerSize
*/
if(!KImage.prototype.setContainerSize) {
	Object.defineProperty(KImage.prototype, 'setContainerSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setContainerSize(width, height) {
			this.addCustom('w', width);
			this.addCustom('h', height);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setSize
*/
if(!KImage.prototype.setSize) {
	Object.defineProperty(KImage.prototype, 'setSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setSize(width, height) {
			this.addCustom('mw', width);
			this.addCustom('mh', height);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setPosition
*/
if(!KImage.prototype.setPosition) {
	Object.defineProperty(KImage.prototype, 'setPosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setPosition(x, y) {
			this.addCustom('mx', x);
			this.addCustom('my', y);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setX
*/
if(!KImage.prototype.setX) {
	Object.defineProperty(KImage.prototype, 'setX', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setX(x) {
			this.addCustom('mx', x);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setY
*/
if(!KImage.prototype.setY) {
	Object.defineProperty(KImage.prototype, 'setY', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setY(y) {
			this.addCustom('my', y);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setLabel
*/
if(!KImage.prototype.setLabel) {
	Object.defineProperty(KImage.prototype, 'setLabel', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabel(text) {
			this.addCustom('label', text);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelPosition
*/
if(!KImage.prototype.setLabelPosition) {
	Object.defineProperty(KImage.prototype, 'setLabelPosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelPosition(x, y) {
			this.addCustom('lmx', x);
			this.addCustom('lmy', y);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelColor
*/
if(!KImage.prototype.setLabelColor) {
	Object.defineProperty(KImage.prototype, 'setLabelColor', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelColor(color) {
			this.addCustom('labelcolor', color);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setLabelSize
*/
if(!KImage.prototype.setLabelSize) {
	Object.defineProperty(KImage.prototype, 'setLabelSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelSize(size) {
			this.addCustom('labelfontsize', size);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_enableLabelBorder
*/
if(!KImage.prototype.enableLabelBorder) {
	Object.defineProperty(KImage.prototype, 'enableLabelBorder', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function enableLabelBorder(bool) {
			this.addCustom('labelborder', (bool ? '1' : '0'));
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setBorder
*/
if(!KImage.prototype.setBorder) {
	Object.defineProperty(KImage.prototype, 'setBorder', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setBorder(size) {
			this.addCustom('border', size);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setQuadcut
*/
if(!KImage.prototype.setQuadcut) {
	Object.defineProperty(KImage.prototype, 'setQuadcut', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setQuadcut(size) {
			this.addCustom('quadcut', size);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setShadow
*/
if(!KImage.prototype.setShadow) {
	Object.defineProperty(KImage.prototype, 'setShadow', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setShadow(position) {
			this.addCustom('shadow', position);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setMirror
*/
if(!KImage.prototype.setMirror) {
	Object.defineProperty(KImage.prototype, 'setMirror', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMirror(state) {
			this.addCustom('mirror', (state ? null : undefined));
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setGreyscale
*/
if(!KImage.prototype.setGreyscale) {
	Object.defineProperty(KImage.prototype, 'setGreyscale', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setGreyscale(state) {
			this.addCustom('gray', (state ? null : undefined));
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setTransparency
*/
if(!KImage.prototype.setTransparency) {
	Object.defineProperty(KImage.prototype, 'setTransparency', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setTransparency(value) {
			this.addCustom('opacity', value);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setMouseSize
*/
if(!KImage.prototype.setMouseSize) {
	Object.defineProperty(KImage.prototype, 'setMouseSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMouseSize(width, height) {
			this.addCustom('mousew', width);
			this.addCustom('mouseh', height);
			return this;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/KImage_setMousePosition
*/
if(!KImage.prototype.setMousePosition) {
	Object.defineProperty(KImage.prototype, 'setMousePosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMousePosition(x, y) {
			this.addCustom('mousex', x);
			this.addCustom('mousey', y);
			return this;
		}
	});
}