<?php
	function replacer($string) {
		return str_replace(array(
			'this.delete',
			'this.public',
			'this.private',
			'Bot.public',
			'Bot.private',
			'this.do'
		), array(
			'this.MINIFIERdelete',
			'this.MINIFIERpublic',
			'this.MINIFIERprivate',
			'Bot.MINIFIERpublic',
			'Bot.MINIFIERprivate',
			'this.MINIFIERdo',
		), $string);
	}
	
	$path 		= dirname(__DIR__) . '/framework/';
	
	print('Remove old files');
	if(file_exists($path . 'KFramework.min.js')) {
		unlink($path . 'KFramework.min.js');
	}
	print(PHP_EOL);
	print(PHP_EOL);
	
	$ignore		= [ 'bak' ];
	$directory	= new RecursiveDirectoryIterator($path);
	$bytes		= 0;
	$files		= 0;
	$content	= '';
	
	foreach(new RecursiveIteratorIterator($directory) AS $name => $file) {
		if($file->getFilename() == '.' || $file->getFilename() == '..' || in_array($file->getExtension(), $ignore)) {
			continue;
		}
		
		$bytes		+= $file->getSize();
		$content	.= replacer($file->openFile()->fread($file->getSize()));
		$content	.= 'EOF();';
		printf('[%d] %s (%s bytes)', $files, $file->getFilename(), number_format($file->getSize()));
		print(PHP_EOL);
		++$files;
	}

	print(PHP_EOL);
	printf('Total: %d, Bytes: %s', $files, number_format($bytes));
	print(PHP_EOL);
	
	$content .= 'function VirtualRequire(file) { /* Do Nothing */ };';
	file_put_contents($path . 'KFramework.min.js', str_replace('require(', 'VirtualRequire(', $content));
?>