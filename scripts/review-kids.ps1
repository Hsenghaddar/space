$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$workspace=Split-Path $PSScriptRoot -Parent
$photos=@(Get-ChildItem -LiteralPath (Join-Path $workspace 'review/kids/media') -Filter '*.jpg' -File | Sort-Object Name)
$font=New-Object System.Drawing.Font('Arial',13)
for($page=0;$page -lt [Math]::Ceiling($photos.Count/20);$page++){
 $sheet=New-Object System.Drawing.Bitmap(1100,1500)
 $graphics=[System.Drawing.Graphics]::FromImage($sheet)
 $graphics.Clear([System.Drawing.Color]::White)
 for($cell=0;$cell -lt 20;$cell++){
  $index=$page*20+$cell
  if($index -ge $photos.Count){break}
  $photo=[System.Drawing.Image]::FromFile($photos[$index].FullName)
  try{
   $scale=[Math]::Min(210/$photo.Width,330/$photo.Height)
   $width=[int]($photo.Width*$scale);$height=[int]($photo.Height*$scale)
   $left=($cell%5)*220+[int]((220-$width)/2);$top=[int][Math]::Floor($cell/5)*375
   $graphics.DrawImage($photo,$left,$top,$width,$height)
   $graphics.DrawString($photos[$index].Name,$font,[System.Drawing.Brushes]::Black,($cell%5)*220+8,$top+335)
  }finally{$photo.Dispose()}
 }
 $sheet.Save((Join-Path $workspace "review/kids/contact-$($page+1).jpg"),[System.Drawing.Imaging.ImageFormat]::Jpeg)
 $graphics.Dispose();$sheet.Dispose()
}
$font.Dispose()
