$Global:ErrorActionPreference = "Stop"

Write-Host "Ensure 'NPM' is installed"
$npmCommand = (get-command npm.cmd -ErrorAction SilentlyContinue).Source;
if ($npmCommand -eq $null) {
    throw "NPM need to be installed and in path"
}

Write-Host "Ensure 'yarn' is installed"
$yarnCommand = (get-command yarn.cmd -ErrorAction SilentlyContinue).Source
if ($yarnCommand -eq $null) {
    Write-host "Installing yarn"
    &$npmCommand install -g yarn
    $yarnCommand = (get-command yarn.cmd).Source
}

Push-Location $PSScriptRoot

Write-Host "Installing packages..."
&$yarnCommand install
Write-Host "Lint checking..."
&$yarnCommand run lint
Write-Host "building packages..."
&$yarnCommand run build

Pop-Location