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
$CLEAN_TARGETS=@("node_modules\litium-ui") 
$CLEAN_TARGETS | ForEach-Object{
    if(Test-Path -Path $_) {
        Remove-Item $_ -Force -Recurse
        Write-Host "clean package : $_ ..."
    }
}
Remove-Item -Path yarn.lock -Force
Pop-Location

Push-Location $PSScriptRoot

Write-Host "Clear litium-ui package cache..."
&$yarnCommand cache clean litium-ui
Write-Host "Installing packages..."
&$yarnCommand install --check-files
Write-Host "Lint checking..."
&$yarnCommand run lint
Write-Host "building packages..."
&$yarnCommand run build

Pop-Location