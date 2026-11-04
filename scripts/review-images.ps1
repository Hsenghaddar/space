$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=Split-Path $PSScriptRoot -Parent
$photos=@(Get-ChildItem -LiteralPath (Join-Path $workspace 'public/products/sale') -Filter '*.jpg' -File | Sort-Object Name)
$outputFolder=Join-Path $workspace 'review/cleaned-photos'
New-Item -ItemType Directory -Force -Path $outputFolder | Out-Null
$font=New-Object System.Drawing.Font('Arial',11)
for($page=0;$page -lt [Math]::Ceiling($photos.Count/16);$page++){
 $sheet=New-Object System.Drawing.Bitmap(880,1640)
 $graphics=[System.Drawing.Graphics]::FromImage($sheet)
 $graphics.Clear([System.Drawing.Color]::White)
 for($cell=0;$cell -lt 16;$cell++){
  $index=$page*16+$cell
  if($index -ge $photos.Count){break}
  $photo=[System.Drawing.Image]::FromFile($photos[$index].FullName)
  try{
   $scale=[Math]::Min(210/$photo.Width,375/$photo.Height)
   $width=[int]($photo.Width*$scale);$height=[int]($photo.Height*$scale)
   $left=($cell%4)*220+[int]((220-$width)/2);$top=[int][Math]::Floor($cell/4)*410
   $graphics.DrawImage($photo,$left,$top,$width,$height)
   $graphics.DrawString($photos[$index].Name,$font,[System.Drawing.Brushes]::Black,($cell%4)*220+8,$top+380)
  }finally{$photo.Dispose()}
 }
 $sheet.Save((Join-Path $outputFolder "cleaned-$($page+1).jpg"),[System.Drawing.Imaging.ImageFormat]::Jpeg)
 $graphics.Dispose();$sheet.Dispose()
}
$font.Dispose()
Write-Output "Created review sheets for $($photos.Count) cleaned product photos."
