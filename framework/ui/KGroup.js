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
	@docs		http://www.mychannel-apps.de/documentation/ui/group
*/

var KCODE_GROUPS_INSTANCES = 0;

function KGroup() {
	var _groups 		= [ undefined ];
	var _show			= 0;
	var _layout_box		= false;
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_add
	*/
	this.add = function(content) {
		_groups.push(content);
		return this;		
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_remove
	*/
	this.remove = function(index) {
		delete _groups[index];
		return this;		
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_update
	*/
	this.update = function(index, content) {
		_groups[index] = content;
		return this;		
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_show
	*/
	this.show = function(index) {
		_show = index;
		return this;		
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_enableBoxLayout
	*/
	this.enableBoxLayout = function(state) {
		_layout_box = state;
		return this;		
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_getNavigation
	*/
	this.getNavigation = function(titles) {
		titles		= (titles == undefined ? [] : titles);
		var buffer	= new StringBuffer();
		var size	= _groups.size();
		buffer.append('°12BB+0000°_°>LEFT<°');
		
		_groups.each(function(content, index) {
			if(content == undefined) {
				return;
			}
			
			var entry	= parseInt(index) + 1;
			var title	= (titles[entry - 2] == undefined ? 'Tab ' + entry : titles[entry  - 2]);
			
			if(_layout_box) {
				// @ToDo Use KLink + KImage
				var left	= 'layout/tab_i_l...w_8.mx_-1.png';
				var middle	= 'layout/tab_i_c...label_' + title + '.mw_' + (title.length * 1.12) + '.png'; // xrepeat
				var right	= 'layout/tab_i_r.png';
				
				buffer.append('°>' + left + '<°').append('°>' + middle + '|' + middle + '<>--<>|/tp-showgrp ' + entry + '<°');
				// >{noxrep}<
				buffer.append('°>' + right + '<°');
			} else {
				buffer.append('°>' + title + '|/tp-showgrp ' + entry + '<°');
			
				if(entry < size) {
					buffer.append(' - ');
				}
			}
		});
		
		buffer.append('°>LEFT<°_°r##°');
		
		return buffer.toString();
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_getTabCommand
	*/
	this.getTabCommand = function(index) {
		return '/tp-showgrp ' + index;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_switchTab
	*/
	this.switchTab = function(index) {
		return '°>{setdisplaygroup}' + index + '<°';
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KGroup_
	*/
	this.toString = function() {
		var buffer = new StringBuffer();
		
		buffer.append('°>{addDisplayGroup}').append(_show).append('<°');

		_groups.each(function(content, index) {
			if(content == undefined) {
				return;
			}
			
			buffer.append('°>{displayGroup}').append(parseInt(index)).append('<°').append(content).append('°>{displayGroupEnd}<°');
		});
		
		return buffer.toString();
	};
};