$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imageDirectory = Join-Path $projectRoot "public\images"
$ffmpeg = Get-Command ffmpeg -ErrorAction Stop
$ffprobe = Get-Command ffprobe -ErrorAction Stop
$hashManifestPath = Join-Path $PSScriptRoot "landing-image-source-hashes.json"
$sourceHashes = Get-Content -LiteralPath $hashManifestPath -Raw | ConvertFrom-Json
$maxDeliveredBytes = 500 * 1024

# Generated with ffmpeg version N-119856-gbe46370941-20250608 and libwebp.
$encoders = & $ffmpeg.Source -hide_banner -encoders 2>&1 | Out-String
if ($LASTEXITCODE -ne 0 -or $encoders -notmatch "\blibwebp\b") {
  throw "FFmpeg must provide the libwebp encoder."
}

$assets = @(
  @{ Source = "nusa-hero-image.png"; Stem = "nusa-hero-image"; LargeBound = 1200; LargeWidth = 1200; LargeHeight = 794; MobileWidth = 640; MobileHeight = 424 },
  @{ Source = "gallery-1-mpls.jpg"; Stem = "gallery-1-mpls"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-2-bersukaria-mataram.jpg"; Stem = "gallery-2-bersukaria-mataram"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 960; MobileWidth = 640; MobileHeight = 480 },
  @{ Source = "gallery-3-itcamp.jpg"; Stem = "gallery-3-itcamp"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-4-itcamp.jpg"; Stem = "gallery-4-itcamp"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-5-nusa-mengajar.jpg"; Stem = "gallery-5-nusa-mengajar"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-6-bersukaria-jajan.jpg"; Stem = "gallery-6-bersukaria-jajan"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-7-googleio.png"; Stem = "gallery-7-googleio"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 848; MobileWidth = 640; MobileHeight = 424 },
  @{ Source = "gallery-8-talk-with-stranger.jpg"; Stem = "gallery-8-talk-with-stranger"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 960; MobileWidth = 640; MobileHeight = 480 },
  @{ Source = "gallery-9-takziyah.jpg"; Stem = "gallery-9-takziyah"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 720; MobileWidth = 640; MobileHeight = 360 },
  @{ Source = "gallery-10-jualan.jpg"; Stem = "gallery-10-jualan"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 960; MobileWidth = 640; MobileHeight = 480 },
  @{ Source = "gallery-11-jualan-cfd.jpeg"; Stem = "gallery-11-jualan-cfd"; LargeBound = 1280; LargeWidth = 960; LargeHeight = 1280; MobileWidth = 480; MobileHeight = 640 },
  @{ Source = "gallery-12-camp.jpg"; Stem = "gallery-12-camp"; LargeBound = 1280; LargeWidth = 1280; LargeHeight = 960; MobileWidth = 640; MobileHeight = 480 }
)

foreach ($asset in $assets) {
  $sourcePath = Join-Path $imageDirectory $asset.Source
  $expectedHash = $sourceHashes.PSObject.Properties[$asset.Source].Value

  if (-not $expectedHash) {
    throw "Missing source hash for $($asset.Source)."
  }

  $actualHash = (Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash
  if ($actualHash -ne $expectedHash) {
    throw "Source image changed: $($asset.Source). Review it and update the manifest intentionally."
  }
}

$outputs = foreach ($asset in $assets) {
  @(
    @{ Source = $asset.Source; Output = "$($asset.Stem).webp"; Bound = $asset.LargeBound; Width = $asset.LargeWidth; Height = $asset.LargeHeight },
    @{ Source = $asset.Source; Output = "$($asset.Stem)-640.webp"; Bound = 640; Width = $asset.MobileWidth; Height = $asset.MobileHeight }
  )
}

$temporaryPaths = @()

try {
  foreach ($output in $outputs) {
    $sourcePath = Join-Path $imageDirectory $output.Source
    $outputPath = Join-Path $imageDirectory $output.Output
    $temporaryPath = [System.IO.Path]::ChangeExtension($outputPath, ".tmp.webp")
    $temporaryPaths += $temporaryPath
    $scale = "scale=$($output.Bound):$($output.Bound):force_original_aspect_ratio=decrease:force_divisible_by=2"

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
      $temporaryPath

    if ($LASTEXITCODE -ne 0) {
      throw "Failed to generate $($output.Output)."
    }

    $probe = & $ffprobe.Source `
      -v error `
      -select_streams v:0 `
      -show_entries stream=codec_name,width,height `
      -of json `
      $temporaryPath | Out-String | ConvertFrom-Json

    $stream = $probe.streams[0]
    if ($stream.codec_name -ne "webp" -or $stream.width -ne $output.Width -or $stream.height -ne $output.Height) {
      throw "Unexpected output metadata for $($output.Output)."
    }

    $outputBytes = (Get-Item -LiteralPath $temporaryPath).Length
    if ($outputBytes -le 0 -or $outputBytes -gt $maxDeliveredBytes) {
      throw "$($output.Output) is outside the delivery budget."
    }
  }

  foreach ($output in $outputs) {
    $outputPath = Join-Path $imageDirectory $output.Output
    $temporaryPath = [System.IO.Path]::ChangeExtension($outputPath, ".tmp.webp")
    Move-Item -LiteralPath $temporaryPath -Destination $outputPath -Force
  }
}
finally {
  foreach ($temporaryPath in $temporaryPaths) {
    if (Test-Path -LiteralPath $temporaryPath) {
      Remove-Item -LiteralPath $temporaryPath -Force
    }
  }
}
