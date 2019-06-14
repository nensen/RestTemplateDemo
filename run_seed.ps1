Function Node-Installed {
	# todo: return if node is installed
	return $true;
}

Function Invoke-Seed {
	cd Script
	npm install
	node main.js
	cd ../
}

# main

if (Node-Installed) {
	Invoke-Seed
} else {
	Write-Output "node is not installed."
}
