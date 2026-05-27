Add-Type -AssemblyName System.Drawing

function New-NotreCuisineIcon([int]$size, [string]$outPath) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $cream     = [System.Drawing.Color]::FromArgb(247, 241, 232)
  $creamDeep = [System.Drawing.Color]::FromArgb(239, 229, 212)
  $terra     = [System.Drawing.Color]::FromArgb(196, 98, 63)
  $bordeaux  = [System.Drawing.Color]::FromArgb(122, 46, 46)
  $rose      = [System.Drawing.Color]::FromArgb(232, 180, 160)

  $bgBrush = New-Object System.Drawing.SolidBrush($cream)
  $g.FillRectangle($bgBrush, 0, 0, $size, $size)
  $bgBrush.Dispose()

  $cx = $size / 2
  $cy = $size / 2

  $plateOuter = $size * 0.78
  $plateInner = $size * 0.62

  # Outer plate ring (terracotta thin)
  $penOuter = New-Object System.Drawing.Pen($terra, [single]($size * 0.012))
  $g.DrawEllipse($penOuter, $cx - $plateOuter/2, $cy - $plateOuter/2, $plateOuter, $plateOuter)
  $penOuter.Dispose()

  # Plate face (cream-deep)
  $plateBrush = New-Object System.Drawing.SolidBrush($creamDeep)
  $g.FillEllipse($plateBrush, $cx - $plateInner/2, $cy - $plateInner/2, $plateInner, $plateInner)
  $plateBrush.Dispose()

  # Inner thin ring
  $penInner = New-Object System.Drawing.Pen($terra, [single]($size * 0.006))
  $g.DrawEllipse($penInner, $cx - $plateInner/2, $cy - $plateInner/2, $plateInner, $plateInner)
  $penInner.Dispose()

  # Heart — parametric equation (smooth, recognizable)
  $heartPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $scale = $size * 0.011
  $points = New-Object System.Collections.ArrayList
  for ($i = 0; $i -lt 180; $i++) {
    $t = ($i / 180.0) * 2 * [Math]::PI
    $mathX = 16 * [Math]::Pow([Math]::Sin($t), 3)
    $mathY = 13 * [Math]::Cos($t) - 5 * [Math]::Cos(2*$t) - 2 * [Math]::Cos(3*$t) - [Math]::Cos(4*$t)
    [void]$points.Add([System.Drawing.PointF]::new($cx + $mathX * $scale, $cy - $mathY * $scale))
  }
  $heartPath.AddPolygon($points.ToArray([System.Drawing.PointF]))

  $heartBrush = New-Object System.Drawing.SolidBrush($bordeaux)
  $g.FillPath($heartBrush, $heartPath)
  $heartBrush.Dispose()
  $heartPath.Dispose()

  # Two small decorative dots above (rose)
  $dotSize = $size * 0.025
  $dotBrush = New-Object System.Drawing.SolidBrush($rose)
  $g.FillEllipse($dotBrush, $cx - $size*0.18, $cy - $plateInner/2 + $size*0.04, $dotSize, $dotSize)
  $g.FillEllipse($dotBrush, $cx + $size*0.18 - $dotSize, $cy - $plateInner/2 + $size*0.04, $dotSize, $dotSize)
  $dotBrush.Dispose()

  $g.Dispose()
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: $outPath ($size x $size)"
}

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$iconDir = Join-Path $baseDir "icons"
if (-not (Test-Path $iconDir)) { New-Item -ItemType Directory -Path $iconDir | Out-Null }

New-NotreCuisineIcon -size 192 -outPath (Join-Path $iconDir "icon-192.png")
New-NotreCuisineIcon -size 512 -outPath (Join-Path $iconDir "icon-512.png")

Write-Host "Done."
