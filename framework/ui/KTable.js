/**
	The MIT License (MIT)

	Copyright (c) 2014 UserApps.de

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
	@docs		http://www.userapps.de/documentation/ui/table
*/

/*
	Example #1:
	var table	= new KTable();
	var row		= new KRow();
	var cell	= new KCell('w1');
	row.add(cell);
	table.add(row);
	Bot.public(table);
	
	Example #2:
	var table	= new KTable();
	table.add(new KRow(new KCell('100', 'Hallo Welt'), new KCell('w1', 'Sonstiges')));
	Bot.public(table);
	@docs	http://www.userapps.de/documentation/KTable_constructor
*/
function KTable() {
	this.javaClassName = 'KTable';	
	var _rows = [];
	
	/*
		@docs	http://www.userapps.de/documentation/KTable_add
	*/
	this.add = function add(element) {
		_rows.push(element);
		return this;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KTable_toString
	*/
	this.toString = function toString() {
		var output = new KCode();
		output.append('°>{table');
		
		// first row fix
		if(_rows.length > 0) {
			output.append('|');
		}
		
		_rows.each(function(row, row_index) {
			row.getCells().each(function(cell, cell_index) {
				output.append('|').append(cell.getSize());
			});
			
			return false;
		});
		
		output.append('}<°');
		
		_rows.each(function(row, index) {
			output.append(row.toString(index == 0));
		});
		
		output.append('°>{endtable}<°');
		
		return output;
	};
}

/*
	@docs	http://www.userapps.de/documentation/KRow_constructor
*/
function KRow() {
	this.javaClassName = 'KRow';	
	var _cells = [];
	
	function KRow() {
		_cells	= [];
	}
	
	/*
		@docs	http://www.userapps.de/documentation/KRow_add
	*/
	this.add = function add(cell) {
		_cells.push(cell);
		return this;		
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KRow_getCells
	*/
	this.getCells = function getCells() {
		return _cells;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KRow_toString
	*/
	this.toString	= function toString(display) {
		display		= display || false;
		var output	= new KCode();
		
		if(!display) {
			output.append('°>{tr}<°');
		}
		
		_cells.each(function(cell) {
			output.append(cell);
		});
		
		return output;
	};
	
	KRow();
}

/*
	@docs	http://www.userapps.de/documentation/KCell_constructor
*/
function KCell(size, content) {
	this.javaClassName = 'KCell';	
	var _size		= 0;
	var _content	= '';
	
	function KCell(size, content) {
		_size		= size || 0;
		_content	= content || '';
	}
	
	/*
		@docs	http://www.userapps.de/documentation/KCell_getSize
	*/
	this.getSize = function getSize() {
		return _size;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KCell_toString
	*/
	this.toString	= function toString() {
		var output = new KCode();

		output.append('°>{tc}<°').append(_content);

		return output;
	};
	
	KCell(size, content);
}