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
	$static		= array(
		/* Tools */
		'tools/String',
		'tools/Array',
		'tools/Object',
		'tools/User',
		'tools/StringBuffer',
		
		/* Core */
		'core/Hash',
		'core/Hooks',
		'core/Database',
		'core/Logger',
		'core/Cronjob',
		'core/Bot',
		'core/KCode',
		'core/KBank',
		'core/Channel',
		'core/User',
		'core/AppStore',
		'KFramework',
		
		/* UI */
		'ui/KButton',
		'ui/KTooltip',
		'ui/KLink',
		'ui/KCountdown',
		'ui/KFont',
		'ui/KImage',
		'ui/KColor',
		'ui/KTable',
		'ui/KGroup'
	);
	print('Remove old files');
	if(file_exists($path . 'KFramework.min.js')) {
		unlink($path . 'KFramework.min.js');
	}
	print(PHP_EOL);
	print(PHP_EOL);
	
	$ignore		= [ 'bak' ];
	//$directory	= new RecursiveDirectoryIterator($path);
	$bytes		= 0;
	$files		= 0;
	$content	= '';
	
	foreach($static AS $name) {
		$bytes		+= filesize($path . $name . '.js');
		$content	.= replacer(file_get_contents($path . $name . '.js'));
		$content	.= 'EOF();';
		printf('[%d] %s (%s bytes)', $files, $name . '.js', number_format(filesize($path . $name . '.js')));
		print(PHP_EOL);
		++$files;
	}
	/*
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
	}*/

	print(PHP_EOL);
	printf('Total: %d, Bytes: %s', $files, number_format($bytes));
	print(PHP_EOL);
	
	$content .= 'function VirtualRequire(file) { /* Do Nothing */ };';
	file_put_contents($path . 'KFramework.min.js', str_replace('require(', 'VirtualRequire(', $content));
?>