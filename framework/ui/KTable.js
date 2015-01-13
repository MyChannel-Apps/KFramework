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
*/
function KTable() {
	var _rows = new Array();
	
	this.add = function(element) {
		_rows.push(element);
	};
	
	this.toString = function() {
		var output = new KCode();
		output.append('°>{table');
		
		// first row fix
		if(_rows.length > 0) {
			output.append('|');
		}
		
		_rows.each(function(row, row_index) {
			row.getCells().each(function(cell, cell_index) {
				output.append('|');
				output.append(cell.getSize());
			});
			
			return false;
		});
		
		output.append('}<°');
		
		_rows.each(function(row) {
			output.append(row);
		});
		
		output.append('°>{endtable}<°');
		
		return output;
	};
}

function KRow() {
	var _cells = [];
	
	function KRow() {
		_cells	= [];
	}
	
	this.add = function(cell) {
		_cells.push(cell);
	};
	
	this.getCells = function() {
		return _cells;
	};
	
	this.toString	= function() {
		var output = new KCode();
		output.append('°>{tr}<°');
		
		_cells.each(function(cell) {
			output.append(cell);
		});
		
		return output;
	};
	
	KRow();
}

function KCell(size, content) {
	var _size		= 0;
	var _content	= '';
	
	function KCell(size, content) {
		_size		= size;
		_content	= content;
	}
	
	this.getSize = function() {
		return _size;
	};
	
	this.toString	= function() {
		var output = new KCode();
		output.append('°>{tc}<°');
		output.append(_content);
		
		return output;
	};
	
	KCell(size, content);
}