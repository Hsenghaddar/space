$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=Split-Path $PSScriptRoot -Parent
$encoder=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$encoderParameters=New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParameters.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]87)
$optimizedCount=0
Get-ChildItem -LiteralPath (Join-Path $workspace 'public/products/sale') -Filter '*.png' -File | ForEach-Object {
 $outputPath=[System.IO.Path]::ChangeExtension($_.FullName,'.jpg')
 if(!(Test-Path -LiteralPath $outputPath)){
  $photo=[System.Drawing.Image]::FromFile($_.FullName)
  try {$photo.Save($outputPath,$encoder,$encoderParameters);$optimizedCount++} finally {$photo.Dispose()}
 }
}
$encoderParameters.Dispose()
Write-Output "Compressed $optimizedCount edited photos for mobile delivery."
