$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=Split-Path $PSScriptRoot -Parent
$encoder=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters=New-Object System.Drawing.Imaging.EncoderParameters(1)
$parameters.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]88)
$catalog=Get-Content -Raw -LiteralPath (Join-Path $workspace 'public/kids-products.json') | ConvertFrom-Json
foreach($product in $catalog){
 $index=$product.id.Replace('kids-','')
 $original=[System.Drawing.Image]::FromFile((Join-Path $workspace "review/kids/media/$index.jpg"))
 try{
  $scale=[Math]::Min(1,900/$original.Width)
  $bitmap=New-Object System.Drawing.Bitmap([int]($original.Width*$scale),[int]($original.Height*$scale))
  $graphics=[System.Drawing.Graphics]::FromImage($bitmap)
  try{
   $graphics.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
   $graphics.DrawImage($original,0,0,$bitmap.Width,$bitmap.Height)
   $bitmap.Save((Join-Path $workspace ('public'+$product.image)),$encoder,$parameters)
  }finally{$graphics.Dispose();$bitmap.Dispose()}
 }finally{$original.Dispose()}
}
$parameters.Dispose()
Write-Output "Optimized $($catalog.Count) kids product photos."
