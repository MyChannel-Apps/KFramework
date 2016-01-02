/**
	The MIT License (MIT)

	Copyright (c) 2015 UserApps.de

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
	@docs		http://www.userapps.de/documentation/core/hash
*/

var Hash = {
	/*
		@docs		http://www.userapps.de/documentation/Hash_decodeForm
	*/
	decodeForm: function decodeForm(string) {
		var chars	= string.split('');
		var output	= [];
		
		/* #### WARNING: this variables will be updated each client update! #### */
		var a		= 97;
		var b		= 4;
		/* #### WARNING: this variables will be updated each client update! #### */
		
		for(var index = 0, char_index = 0; index < chars.length / 2; index++, char_index += 2) {
			output.push((chars[char_index].charCodeAt(0) - a << b | chars[char_index + 1].charCodeAt(0) - a) ^ index & 255);
		}
		
		for(var index = 0; index < output.length; index++) {
			output[index] = output.fromCharCode(output[index]);
		}
		
		return output.join('');
	},
	/*
		@docs		http://www.userapps.de/documentation/Hash_toString
	*/
	toString: function toString() {
		return '[KFramework Hash]';
	}
};