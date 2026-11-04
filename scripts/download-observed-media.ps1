$ErrorActionPreference='Stop'
$catalogSources=Get-Content -Raw -LiteralPath "$PSScriptRoot/additional-source-photos.json" | ConvertFrom-Json
$destination=Join-Path (Split-Path $PSScriptRoot -Parent) 'source-posts'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
foreach($productSource in $catalogSources){
 try { Invoke-WebRequest -Uri $productSource.url -OutFile (Join-Path $destination "$($productSource.id).jpg") -UseBasicParsing -TimeoutSec 35; Write-Output "$($productSource.id): downloaded" }
 catch { Write-Output "$($productSource.id): download unavailable" }
}
