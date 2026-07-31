$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imageDirectory = Join-Path $projectRoot "public\images"
$ffmpeg = Get-Command ffmpeg -ErrorAction Stop

$assets = @(
  @{ Source = "nusa-hero-image.png"; Output = "nusa-hero-image.webp"; Bound = 1200 },
  @{ Source = "gallery-1-mpls.jpg"; Output = "gallery-1-mpls.webp"; Bound = 1280 },
  @{ Source = "gallery-2-bersukaria-mataram.jpg"; Output = "gallery-2-bersukaria-mataram.webp"; Bound = 1280 },
  @{ Source = "gallery-3-itcamp.jpg"; Output = "gallery-3-itcamp.webp"; Bound = 1280 },
  @{ Source = "gallery-4-itcamp.jpg"; Output = "gallery-4-itcamp.webp"; Bound = 1280 },
  @{ Source = "gallery-5-nusa-mengajar.jpg"; Output = "gallery-5-nusa-mengajar.webp"; Bound = 1280 },
  @{ Source = "gallery-6-bersukaria-jajan.jpg"; Output = "gallery-6-bersukaria-jajan.webp"; Bound = 1280 },
  @{ Source = "gallery-7-googleio.png"; Output = "gallery-7-googleio.webp"; Bound = 1280 },
  @{ Source = "gallery-8-talk-with-stranger.jpg"; Output = "gallery-8-talk-with-stranger.webp"; Bound = 1280 },
  @{ Source = "gallery-9-takziyah.jpg"; Output = "gallery-9-takziyah.webp"; Bound = 1280 },
  @{ Source = "gallery-10-jualan.jpg"; Output = "gallery-10-jualan.webp"; Bound = 1280 },
  @{ Source = "gallery-11-jualan-cfd.jpeg"; Output = "gallery-11-jualan-cfd.webp"; Bound = 1280 },
  @{ Source = "gallery-12-camp.jpg"; Output = "gallery-12-camp.webp"; Bound = 1280 }
)

foreach ($asset in $assets) {
  $sourcePath = Join-Path $imageDirectory $asset.Source
  $outputPath = Join-Path $imageDirectory $asset.Output
  $scale = "scale=$($asset.Bound):$($asset.Bound):force_original_aspect_ratio=decrease:force_divisible_by=2"

  & $ffmpeg.Source `
    -hide_banner `
    -loglevel error `
    -y `
    -i $sourcePath `
    -vf $scale `
    -frames:v 1 `
    -c:v libwebp `
    -preset photo `
    -quality 76 `
    $outputPath

  if ($LASTEXITCODE -ne 0) {
    throw "Failed to generate $($asset.Output)"
  }
}
